import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Main from "../Layout/Main";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Login/Register";
import Service from "../Pages/Services/Service";
import AddService from "../Pages/AddService/AddService";
import MyReview from "../Pages/MyReview/MyReview";
import Blog from "../Pages/Blog/Blog";
import PrivateRoute from "./PrivateRoute";
import { ServiceDetails } from "../Pages/Services/ServiceDetails";
import UpdateReview from "../Pages/MyReview/UpdateReview";
import ErrorPage from "../Pages/ErrorPage";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/home",
                element: <Home></Home>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path: "/service",
                element: <Service></Service>
            },
            {
                path: "/service/:id",
                element: <ServiceDetails></ServiceDetails>,
                loader: async ({ params }) => {
                    return fetch(`https://assignment-11-server-arifullah3202.vercel.app/service/${params.id}`);
                }
            },
            {
                path: '/addService',
                element: <PrivateRoute><AddService></AddService></PrivateRoute>
            },
            {
                path: '/myReview',
                element: <PrivateRoute><MyReview></MyReview></PrivateRoute>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: "/updateReview/:id",
                element: <UpdateReview></UpdateReview>,
                loader: async ({ params }) => {
                    return fetch(`https://assignment-11-server-arifullah3202.vercel.app/updateReview/${params.id}`);
                }

            }

        ]
    }
])
export default router;