import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Connections = () => {
    const [connections, setConnections] = useState([]);  // Store as an array directly

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
            setConnections(res.data.data);  // Fix: Extract `data` properly
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <>
            <div className="m-8  text-3xl font-bold mb-4 text-center ">Connections</div>

            <div className="space-y-2">
                {connections.length > 0 ? connections.map((user) => (

                    <div key={user._id} className= "  p-4 border rounded-lg shadow flex justify-center mx-auto max-w-md">
                        <div className='mt-4 flex flex-col items-center'>
                            <img
                                className='w-48 rounded-lg'
                                src={user.photoUrl} alt="" />
                            <p className='text-2xl text-center'>{user.firstName} {user.lastName}</p>
                            <p className='text-xl text-center'>{user.age}, {user.gender}</p>
                            <p className='text-xl text-center'>{user.about}</p>
                        </div>
                    </div>
                )) : <p>No connections found.</p>}
            </div>
        </>
    );
}

export default Connections;
