import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ReviewsRow = ({ review, handleDelete }) => {
    const { content, author, service } = review;
    const [Service, setService] = useState({})
    useEffect(() => {
        fetch(`https://assignment-11-server-arifullah3202.vercel.app/service/${service}`)
            .then(res => res.json())
            .then(data => setService(data));
    }, [])

    return (
        <tr key={review._id} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
            <td className="py-3 -pl-3">{author}</td>
            <td className="p-3">{Service.title}</td>
            <td className="p-3">{content}</td>
            <td className="p-3">
                <button onClick={() => handleDelete(review._id)}>Delete</button>
                <Link className="p-3" to={`/updateReview/${review._id}`} >Edit</Link>
            </td>

        </tr>
    )
}

export default ReviewsRow
