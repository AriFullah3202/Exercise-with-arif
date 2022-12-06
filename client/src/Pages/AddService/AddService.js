import React from 'react'
import { toast } from 'react-toastify';
import useTitle from '../../hooks/useTitle';


const AddService = () => {
    useTitle("Add Service")
    const handleAddService = (event) => {
        event.preventDefault();
        const form = event.target
        const name = event.target.name.value; //targeting the input field name
        console.log(name)
        const img = event.target.imgeUrl.value;
        console.log(img)
        const price = event.target.price.value;
        console.log(price)
        const details = event.target.details.value;
        console.log(details)

        const service = {
            title: name,
            img: img,
            price: price,
            details: details

        }
        fetch('https://assignment-11-server-arifullah3202.vercel.app/service', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(service)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`Add successfuly`, { autoClose: 2000 })
                    form.reset()
                }
            })
            .catch(er => console.error(er));
    }

    return (
        <section className="p-6 bg-gray-200 dark:text-gray-50">
            <form onSubmit={handleAddService} className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium text-2xl">Please Add a Service</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="username" className="text-sm">Service Name</label>
                            <input id="name" name="name" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="website" className="text-sm">imgeUrl</label>
                            <input id="imageUrl" name="imgeUrl" type="text" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="website" className="text-sm">Price</label>
                            <input id="price" name="price" type="number" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full">
                            <label htmlFor="bio" className="text-sm">Description</label>
                            <textarea id="details" name="details" placeholder="" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900"></textarea>
                        </div>

                    </div>
                </fieldset>
                <div className="flex justify-end mt-6">
                    <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Add</button>
                </div>
            </form>
        </section>
    )
}

export default AddService
