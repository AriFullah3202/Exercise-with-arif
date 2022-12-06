import React, { useEffect, useState } from 'react'
import Slider from './Slider/Slider';
import Action from './Action/Action';
import useTitle from '../../hooks/useTitle';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';



{/* <img src={service ?.img} className="w-80 h-40" alt="" /> */ }


const Home = () => {
    const [load, setLoad] = useState(true);
    const [services, setServices] = useState([]);
    useTitle('Home')

    useEffect(() => {
        const url = `https://assignment-11-server-arifullah3202.vercel.app/services?page=0&size=3`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setServices(data.services)
                setLoad(false)
            })
    }, [])

    console.log(services)

    return (
        <div>
            <Slider></Slider>

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
            <div className="text-center">

                <button> <Link className="p-3 mt-6 shadow-lg bg-green-300 text-bottom mx-auto" to="/service">View all</Link></button>
            </div>

            <Action></Action>

        </div >
    )
}

export default Home
