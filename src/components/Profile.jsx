import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const Profile = () => {
    const user = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(user || {}); // Ensure an empty object as default
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(BASE_URL + "/profile/view", { withCredentials: true });
                setProfile(res.data);
                dispatch(addUser(res.data));
            } catch (err) {
                console.error("Error fetching profile", err);
            }
        };

        fetchProfile();
    }, [location.pathname]);

    if (!profile || Object.keys(profile).length === 0) {
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
                    <img className="w-full h-full object-cover" src={profile.photoUrl || "/default-avatar.png"} alt="User Avatar" />
                </div>

                {/* User Details */}
                <p className="text-lg font-medium">{profile.firstName || "N/A"} {profile.lastName || ""}</p>
                <p className="text-gray-400">{profile.emailId || "N/A"}</p>
                <p className="text-gray-400">Age: <span className="font-semibold">{profile.age || "N/A"}</span></p>
                <p className="text-gray-400">Gender: <span className="font-semibold">{profile.gender || "N/A"}</span></p>

                {/* Skills Section */}
                <div className="mt-3">
                    <h3 className="text-lg font-semibold">Skills:</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {(profile.skills || []).length > 0 ? (
                            profile.skills.map((skill, index) => (
                                <span key={index} className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <p className="text-gray-400">No skills added</p>
                        )}
                    </div>
                </div>

                {/* About Section */}
                <p className="text-gray-400 text-sm text-center mt-2">"{profile.about || "No about info"}"</p>

                {/* Edit Profile Button */}
                <button
                    onClick={() => navigate('/edit-profile')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Edit Profile
                </button>
            </div>
        </div>
    );
};

export default Profile;
