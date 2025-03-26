import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.request);
    const [showToast, setShowToast] = useState(false)
    const [buttonStatus, setButtonStatus] = useState("");
    const [showButtons, setShowButtons] = useState(true)
    const fetchPendingRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + '/user/requests/received', {
                withCredentials: true
            });
            dispatch(addRequests(res.data.data));
        } catch (err) {
            console.error(err.message);
        }
    };

    const handleRequest = async (status, requestId) => {
        try {

            const res = await axios.post(BASE_URL + `/request/review/${status}/${requestId}`, {}, {
                withCredentials: true
            })
            setShowButtons(false)
            setShowToast(true)
            setTimeout(() => {
                setShowToast(false)
            }, 3000);

            dispatch(removeRequest(requestId))
            // console.log(res.data);
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        fetchPendingRequests();
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6  min-h-screen">
            <h1 className="text-center font-bold text-3xl mb-6 text-gray-200">Pending Requests</h1>

            {requests.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {requests.map((request) => (
                        <div
                            key={request._id}
                            className="bg-gray-800 shadow-md rounded-xl p-6 flex items-center gap-4 border border-gray-700 hover:bg-gray-700 transition duration-300"
                        >
                            <img
                                className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
                                src={request.fromUserId.photoUrl}
                                alt={request.fromUserId.firstName}
                            />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-100">
                                    {request.fromUserId.firstName} {request.fromUserId.lastName}
                                </h2>
                                <p className="text-gray-400">{request.fromUserId.age}, {request.fromUserId.gender}</p>
                                <p className="text-gray-300 italic">{request.fromUserId.about}</p>
                            </div>
                            {showButtons && (
                                <div className='flex gap-x-8 mx-12 '>
                                    <button className="btn btn-outline" onClick={() => {
                                        handleRequest("rejected", request._id)
                                        setButtonStatus("rejected")
                                    }} >Reject</button>

                                    <button onClick={() => {
                                        handleRequest("accepted", request._id)
                                        setButtonStatus("accepted")
                                    }} className="btn btn-outline btn-secondary">Accept</button>

                                </div>)

                            }

                        </div>
                    ))}
                    {
                        showToast && (<div className="toast toast-top toast-center">
                            <div className="alert alert-success">
                                <span>request {buttonStatus} successfully.</span>
                            </div>
                        </div>)}
                </div>
            ) : (
                <p className="text-center text-gray-400">No pending requests.</p>
            )}
        </div>


    );
};

export default Requests;
