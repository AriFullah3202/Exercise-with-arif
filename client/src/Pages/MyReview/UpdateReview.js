import React from 'react'
import { useLoaderData, useNavigate } from 'react-router';

const UpdateReview = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    console.log(data._id)
    const handleUpdateReview = event => {
        event.preventDefault();
        const name = event.target.name.value; //targeting the input field name
        const user = {
            name: name
        }
        fetch(`https://assignment-11-server-arifullah3202.vercel.app/update/${data._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)


        }).then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/myReview')
            }).catch(err => [])

    }

    return (
        <div>
            <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">Add to Review</h2>

                <form onSubmit={handleUpdateReview}>
                    <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" for="username">Serivce Name</label>
                            <input defaultValue={data.serviceTitle} readOnly id="username" type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" for="emailAddress">Review</label>
                            <input name="name" defaultValue={data.content} id="emailAddress" type="name" className="block w-full px-4 py-10 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                        </div>


                    </div>

                    <div className="flex justify-end mt-6">
                        <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Update</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default UpdateReview
