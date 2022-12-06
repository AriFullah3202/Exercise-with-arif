import React, { useContext, useState } from 'react'
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import { GoogleAuthProvider } from '@firebase/auth';
import useTitle from '../../hooks/useTitle';


const Login = () => {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const location = useLocation();
    useTitle('Login')

    const from = location.state ?.from ?.pathname || '/';


    const { logIn, setLoading } = useContext(AuthContext);
    const { providerLogin } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider()

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(typeof password)
        console.log(email, password)
        logIn(email, password)
            .then(res => {
                console.log(res.user)
                if (res.user) {
                    console.log("user is founf")
                    const user = res.user;
                    const currentUser = {
                        email: user.email
                    }
                    fetch('https://assignment-11-server-arifullah3202.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'Application/json'
                        },
                        body: JSON.stringify(currentUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            localStorage.setItem('token', data.token)
                            navigate(from);
                        })
                        .catch(err => console.log(err))
                }
            }).catch(err => {
                console.log(err);
                setError(err.message);
                console.log(err.message);

            }).finally(() => {
                setLoading(false);
            })
    }


    const handleGoogleSignIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                console.log(user);
                if (result.user) {
                    const user = result.user;
                    const currentUser = {
                        email: user.email
                    }
                    fetch('https://assignment-11-server-arifullah3202.vercel.app/jwt', {
                        method: 'POST',
                        headers: {
                            'content-type': 'Application/json'
                        },
                        body: JSON.stringify(currentUser)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            localStorage.setItem('token', data.token)
                            navigate(from);
                        })
                }
            })
            .catch(error => console.error(error))
            .finally(() => {
                setLoading(false);
            })
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
                            Sign in to your account
            </h2>

                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px mb-8 rounded-md shadow-sm">
                            <div className="mb-3">
                                <label htmlFor="email-address" className="sr-only">
                                    Email Address
                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="mb-3">
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

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                </a>
                            </div>
                        </div>
                        <h1 className="text-red-400">{error}</h1>
                        <div>
                            <button
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">

                                </span>
                                Sign in
              </button>
                        </div>
                        <p className="text-sm text-center text-white-400">Dont have account?
            <Link to="/register" rel="noopener noreferrer" className="focus:underline hover:underline text-red-800">Register here</Link>
                        </p>
                    </form>
                    <div className="flex items-center w-full my-2">
                        <hr className="w-full text-gray-400" />
                        <p className="px-4 text-gray-400">OR</p>
                        <hr className="w-full text-gray-400" />
                    </div>
                    <div className="my-6 space-y-4">
                        <button onClick={handleGoogleSignIn} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 border-gray-400 focus:ring-violet-400">
                            <FaGoogle></FaGoogle>
                            <p>Login with Google</p>
                        </button>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
