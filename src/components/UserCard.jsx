import axios from 'axios';
import React, { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const dispatch = useDispatch()
    const handleRequest = async (status, toUserId) => {
        try {
            const res = await axios.post(BASE_URL + `/request/send/${status}/${toUserId}`, {}, { withCredentials: true })
            // console.log(res.data)
            console.log(toUserId)
            dispatch(removeUserFromFeed(toUserId));
        }
        catch (err) {
            console.error(err.message);
        }
    }



    return (
        <div className="h-screen flex items-center justify-center ">
            <div className="bg-[#1e1e1e] shadow-lg rounded-xl w-96 overflow-hidden border border-gray-700 transition duration-300 hover:scale-105 hover:shadow-blue-500/20" key={user._id}>
                <figure className="relative">
                    <img
                        className="w-full h-48 object-cover rounded-t-xl"
                        src={user.photoUrl}
                        alt={`${user.firstName}'s Profile`}
                    />
                    {user.age && user.gender && (
                        <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 text-sm rounded-md">
                            {user.age} | {user.gender}
                        </div>
                    )}
                </figure>
                <div className="p-6 text-center text-white">
                    <h2 className="text-2xl font-semibold text-gray-200">
                        {user.firstName} {user.lastName}
                    </h2>
                    <p className="text-gray-400 mt-2">{user.about}</p>
                    <div className="flex justify-center mt-6 gap-4">
                        <button onClick={() => { handleRequest("ignored", user._id) }} className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition shadow-md shadow-red-500/20">Ignore</button>
                        <button onClick={() => { handleRequest("interested", user._id) }} className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition shadow-md shadow-blue-500/20">Interested</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
