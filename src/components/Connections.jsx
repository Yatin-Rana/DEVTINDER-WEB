import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';

const Connections = () => {
    const [connections, setConnections] = useState([]);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            setConnections(res.data.data);
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="m-8">
            <h1 className="text-4xl font-extrabold text-center text-white mb-6">
                Connections
            </h1>

            {connections.length > 0 ? (
                <div className="flex flex-wrap justify-center gap-6">
                    {connections.map((user) => (
                        <div 
                            key={user._id} 
                            className="w-64 bg-gray-900 bg-opacity-75 rounded-lg shadow-lg p-5 flex flex-col items-center transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                className="w-24 h-24 object-cover rounded-full border-4 border-gray-700"
                                src={user.photoUrl}
                                alt={`${user.firstName} ${user.lastName}`}
                            />
                            <p className="text-xl font-semibold text-white mt-4">{user.firstName} {user.lastName}</p>
                            <p className="text-gray-400">{user.age}, {user.gender}</p>
                            <p className="text-gray-500 text-center px-2 mt-2">{user.about}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400 text-lg">No connections found.</p>
            )}
        </div>
    );
};

export default Connections;
