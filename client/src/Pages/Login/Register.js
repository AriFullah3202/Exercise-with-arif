import React, { useContext, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import useTitle from '../../hooks/useTitle';



const Register = () => {

    const { createUser, updateUserProfile } = useContext(AuthContext);
    const [error, setError] = useState("")
    useTitle('Register')
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state ?.from ?.pathname || '/';

    const handleSubmit = (event) => {
        event.preventDefault();//it will not reload
        const form = event.target;
        const name = form.name.value;// check name , email field 
        const email = form.email.value;
        const password = form.password.value;
        const photoUrl = form.photoUrl.value;
        console.log(typeof password)
        console.log(email, password, name)
        console.log(email, password, name)
        createUser(email, password)
            .then(res => {
                setError('');
                form.reset();
                handleUpdateUserProfile(name, photoUrl);
                console.log("saved successful")
                navigate(from);
            })
            .catch(err => {
                console.error(err);
                setError(err.message);
            })
    }
    const handleUpdateUserProfile = (name, photoUrl) => {
        const profile = {
            displayName: name,
            photoUrl: photoUrl
        }

        updateUserProfile(profile)
            .then(() => { })
            .catch(error => console.error(error));
    }
    return (
        <>

            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://i.ibb.co/wgRc51h/gym-instructor.png"
                            alt="Gym Instuctor"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Please Sign Up
            </h2>
                        <p className="text-sm text-center text-white-400">Already have an Account?
            <Link to="/login" rel="noopener noreferrer" className="focus:underline hover:underline text-red-400">Login</Link>
                        </p>

                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px mb-5 rounded-md shadow-sm">
                            <div className="">
                                <label htmlFor="name" className="sr-only">
                                    Name
                </label>
                                <input
                                    id="Name"
                                    name="name"
                                    type="name"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Name"
                                />
                            </div>
                            <div className="py-3">
                                <label htmlFor="photoUrl" className="sr-only">
                                    PhotoURL
                </label>
                                <input
                                    id="photoUrl"
                                    name="photoUrl"
                                    type="photoUrl"
                                    autoComplete="name"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="PhotoURL"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div className="py-3">
                                <label htmlFor="password" className="sr-only">
                                    Password
                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>

                        </div>

                        <div className="flex items-center justify-between">

                        </div>
                        <h1 className="text-red-400">{error}</h1>
                        <div>
                            <button
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                                </span>
                                Sign Up
              </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
