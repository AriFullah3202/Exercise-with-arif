import React, { useState, useEffect } from 'react'
import useTitle from '../../hooks/useTitle';
import ClipLoader from 'react-spinners/ClipLoader';
import { Link } from 'react-router-dom';
import { Pagination } from 'antd';

import 'antd/dist/antd.min.css'

import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';







const Service = () => {
    const [load, setLoad] = useState(true);
    const [services, setServices] = useState([]);
    const [count, setCount] = useState(0)
    const [page, setPage] = useState(0)

    const size = 3

    useTitle('Service')

    useEffect(() => {
        const url = `https://assignment-11-server-arifullah3202.vercel.app/services?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setServices(data.services)
                setLoad(false)
                setCount(data.count)
            })
    }, [page])

    const onChange = (pageNumber) => {
        let pagenumber = pageNumber;

        setPage(pagenumber)

        console.log(pagenumber)
    };



    return (
        <div>

            <div className="flex flex-wrap justify-center items-center p-4">
                {load ? (
                    <ClipLoader
                        loading={load}
                        size={50}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                ) : (
                        <>

                            {
                                services.map(service => {
                                    return <div key={service._id} className="flex flex-wrap justify-center items-center py-30">
                                        <div className="shadow-lg rounded-2xl h-96 w-80 m-10 hover:shadow-xl">
                                            <div className="flex justify-center">
                                                <PhotoProvider>
                                                    <div className="foo">
                                                        <PhotoView src={service ?.img}>
                                                            <img className="w-80 h-40" src={service ?.img} alt="" />
                                                        </PhotoView>

                                                    </div>
                                                </PhotoProvider>
                                            </div>
                                            <div className="justify-around items-center pl-3">
                                                <h1 className="text-gray-800 bg-white-900 text-xl"> {service ?.title}</h1>
                                                <p className=" ">Price : {service ?.price}</p>
                                                <p className="w-72 text-left">{service ?.details.length > 100 ? service.details.slice(0, 100) + '...' : service.details}</p>
                                                <Link
                                                    to={`/service/${service ?._id}`}
                                                    className="p-3 mt-6 shadow-lg bg-green-300"
                                                >
                                                    View Details
                     </Link>
                                            </div>

                                        </div>
                                    </div>
                                })


                            }

                        </>
                    )

                }

            </div>
            <div className="my-20">
                <Pagination className="text-center" disable defaultCurrent={1} total={count} onChange={onChange} size={size} defaultPageSize={3} />

            </div>
        </div>
    )
}

export default Service
