import { toast } from 'react-toastify';
import React, { useState, useContext, useEffect } from 'react'
import { useLoaderData } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { Avatar, Button, Comment, Form, Input, List } from 'antd';
import moment from 'moment';
import { AuthContext } from '../../context/UserContext';
const { TextArea } = Input;



const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);
const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
        </Button>
        </Form.Item>
    </>
);




export const ServiceDetails = () => {
    const { user } = useContext(AuthContext)

    const [comments, setComments] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const data = useLoaderData()
    const handleSubmit = () => {
        if (!value) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setValue('');
            setComments([
                ...comments,
                {
                    author: `${user ?.displayName}`,
                    avatar: `${user ? user.photoURL : "https://joeschmoe.io/api/v1/random"}`,
                    content: <p>{value}</p>,
                    datetime: moment(new Date()).fromNow(),
                },

            ]);
        }, 1000);

        const review = {
            email: `${user ?.email}`,
            author: `${user ?.displayName}`,
            avatar: `${user ? user.photoURL : "https://joeschmoe.io/api/v1/random"}`,
            content: value,
            service: data._id,
            serviceTitle: data.title,
            datetime: new Date()

        }

        fetch('https://assignment-11-server-arifullah3202.vercel.app/review', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success(`Add successfuly`, { autoClose: 2000 })
                }
            })
            .catch(er => console.error(er));
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    useEffect(() => {
        fetch(`https://assignment-11-server-arifullah3202.vercel.app/review/${data._id}`)
            .then(res => res.json())
            .then(data => {
                setComments(data)
            })

    }, [])

    return (
        <div className="max-w-3xl rounded-md shadow-md bg-white-800 text-gray-900 mx-auto">

            <div className="mx-auto">
                <div className="max-w-3xl rounded-md shadow-md bg-gray-300 text-white-100 flex flex-wrap justify-center mx-auto">
                    <img src={data.img} alt="" className="object-cover object-center w-80 rounded-t-md h-72 bg-gray-500 " />
                    <div className="flex flex-col justify-between p-6 space-y-8 w-80">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-semibold tracking-wide">Service :{data.title}</h2>
                            <p className="text-white-100">{data.details}</p>
                            <h2 className="text-3xl font-semibold tracking-wide">Price : ${data.price}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <> {user ?.uid ? (<>
                <Comment
                    avatar={<Avatar src={user ? user.photoURL : "https://joeschmoe.io/api/v1/random"} alt={user ?.displayName} />}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            </>
            )
                :
                (<p className="text-center text-2xl py-3">Please login to add Review <Link to="/login">Login</Link> </p>)
                

            }
                {comments.length > 0 && <CommentList comments={comments} />}
            </>
        </div>
    )
}