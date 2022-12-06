import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import ReviewsRow from "../Services/ReviewsRow";

import { toast } from 'react-toastify';
import useTitle from "../../hooks/useTitle";
import ClipLoader from "react-spinners/ClipLoader";




const MyReview = () => {
    useTitle("My Review")
    const { user, logOut } = useContext(AuthContext)
    const [load, setload] = useState(true);
    useTitle("Review")
    const [review, setReview] = useState([]);
    useEffect(() => {
        fetch(`https://assignment-11-server-arifullah3202.vercel.app/review?email=${user ?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut();
                }
                return res.json();
            })
            .then(data => {
                setReview(data);
                setload(false)
                console.log(`${data}`)
            })
    }, [user ?.email, logOut])


    const handleDelete = id => {
        // agree varible ok dile true hbe . and cancel korle false hbe
        fetch(`https://assignment-11-server-arifullah3202.vercel.app/review/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                // data er moddhe 2 ta property de . tar moddhe ekta deletedCount eti return korbe =1
                if (data.deletedCount > 0) {
                    const remaining = review.filter(usr => usr._id !== id)
                    console.log(remaining)
                    setReview(remaining)
                    toast.success(`Deleted successfuly ${review._id}`, { autoClose: 2000 })
                }
            })
            .catch(err => { "does not delete" })

    }

    console.log(`the length is ${review.length}`)

    return (
        <>
            {
                load ? (
                    <ClipLoader
                        loading={load}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                        <>

                            {

                                review.length > 0 ?
                                    <div>
                                        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100" >
                                            <div className="overflow-x-auto">
                                                <table className="min-w-full text-xs">
                                                    <thead className="dark:bg-gray-700">
                                                        <tr className="text-center">
                                                            <th className="py-3">Name</th>
                                                            <th className="p-3">Service Name</th>
                                                            <th className="p-3">Review</th>
                                                            <th className="p-3">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {

                                                            review.map((review, index) =>
                                                                <ReviewsRow key={index} review={review} handleDelete={handleDelete}></ReviewsRow>

                                                            )

                                                        }
                                                    </tbody>


                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    : <h1 className="flex flex-col fixed top-1/2 left-2/4 text-2xl text-red-300">No  reviews were added</h1>



                            }
                        </>

                    )
            }
        </>
    )
}

export default MyReview
