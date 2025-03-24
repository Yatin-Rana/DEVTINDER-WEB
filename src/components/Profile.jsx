import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    if (!user) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
                <p className="text-gray-400 text-xl">No user data available</p>
            </div>
        );
    }

    return (
        <div className="max-w-sm mx-auto bg-gray-800 rounded-2xl shadow-lg p-6 text-white mt-24">
            <h2 className="text-2xl font-bold text-center mb-4">Profile</h2>

            <div className="flex flex-col items-center space-y-3">
                {/* User Avatar */}
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-700">
                    <img className="w-full h-full object-cover" src={user.photoUrl} alt="User Avatar" />
                </div>

                {/* User Details */}
                <p className="text-lg font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-400">{user.emailId}</p>
                <p className="text-gray-400">Age: <span className="font-semibold">{user.age}</span></p>
                <p className="text-gray-400">Gender: <span className="font-semibold">{user.gender}</span></p>

                {/* Skills Section */}
                <div className="mt-3">
                    <h3 className="text-lg font-semibold">Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user.skills.map((skill, index) => (
                            <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* About Section */}
                <p className="text-gray-400 text-sm text-center mt-2">"{user.about}"</p>

                {/* Edit Profile Button */}
                <button onClick={() => navigate('/edit-profile')} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
