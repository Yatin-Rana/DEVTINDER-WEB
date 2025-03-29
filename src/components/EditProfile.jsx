import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { BASE_URL } from '../utils/constants';
import UserCard from './UserCard';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  // Local state with fallback values
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [about, setAbout] = useState(user?.about || '');
  const [age, setAge] = useState(user?.age || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);

  // Fetch user data
  const fetchUser = async () => {
    try {
      if (user?.firstName) return;
      const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
      dispatch(addUser(res.data));
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setGender(res.data.gender);
      setAbout(res.data.about);
      setAge(res.data.age);
      setPhotoUrl(res.data.photoUrl);
    } catch (err) {
      console.error('Error fetching profile:', err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, gender, about, age, photoUrl },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      );
      dispatch(addUser(response.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (err) {
      setError(err?.response?.data || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8">
        {/* Form Section */}
        <div className="w-full md:w-2/3 bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
            Edit Your Profile
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">
                First Name
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                id="firstName"
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter first name"
                required
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">
                Last Name
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                id="lastName"
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter last name"
                required
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-300">
                Gender
              </label>
              <div className="dropdown dropdown-bottom mt-1">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600 rounded-lg p-3 text-left"
                >
                  {gender || 'Select Gender'}
                </div>
                <ul className="dropdown-content menu bg-gray-700 rounded-lg w-full p-2 shadow-lg z-10 text-white">
                  <li>
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className="hover:bg-gray-600 p-2 rounded"
                    >
                      Male
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className="hover:bg-gray-600 p-2 rounded"
                    >
                      Female
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => setGender('others')}
                      className="hover:bg-gray-600 p-2 rounded"
                    >
                      Others
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <label htmlFor="about" className="block text-sm font-medium text-gray-300">
                About
              </label>
              <textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 h-24 resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Tell us about yourself"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-300">
                Age
              </label>
              <input
                value={age}
                onChange={(e) => setAge(e.target.value)}
                type="number"
                id="age"
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Enter your age"
                required
              />
            </div>

            <div>
              <label htmlFor="photoUrl" className="block text-sm font-medium text-gray-300">
                Photo URL
              </label>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                type="text"
                id="photoUrl"
                className="mt-1 w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Paste your photo URL"
                required
              />
            </div>

            {error && <div className="text-red-400 text-sm text-center">{error}</div>}

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg py-3 px-5 transition duration-200"
            >
              Save Profile
            </button>
          </form>
        </div>

        {/* UserCard Preview */}
        <div className="hidden md:block md:w-1/3">
          <UserCard user={{ firstName, lastName, gender, age, about, photoUrl }} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert bg-green-600 text-white rounded-lg shadow-lg">
            <span>Profile saved successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;