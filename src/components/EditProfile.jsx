import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import UserCard from './UserCard'

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user); // Get user from Redux

  // Local state initialized with default values to prevent null errors
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [gender, setGender] = useState(user?.gender || '');
  const [about, setAbout] = useState(user?.about || '');
  const [age, setAge] = useState(user?.age || '');
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || '');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false)

  // Fetch user details
  const fetchUser = async () => {
    try {
      if (user?.firstName) return; // If user exists, don't fetch again

      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true
      });

      dispatch(addUser(res.data));


      // Update state with fetched user data
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setGender(res.data.gender);
      setAbout(res.data.about);
      setAge(res.data.age);
      setPhotoUrl(res.data.photoUrl);

    } catch (err) {
      // if (err.response?.status === 401) navigate('/login');
      console.error("Error while fetching profile:", err.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]); // Runs when `user` changes

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(BASE_URL + "/profile/edit",
        { firstName, lastName, gender, about, age, photoUrl },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      console.log("Profile updated:", response.data);
      dispatch(addUser(response.data));
      setShowToast(true)
      const i = setTimeout(() => {
        setShowToast(false)
      }, 2000);

      // navigate('/profile');

    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className='flex justify-center my-12 gap-x-16'>
      <section className="">
        <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
          <div className='sm:h-[100vh] justify-start mt-12 md:h-screen w-full flex flex-col items-center md:mt-16'>
            <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold text-gray-900 md:text-2xl dark:text-white">
                  Update Profile
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      First Name
                    </label>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      type="text"
                      id="firstName"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Last Name
                    </label>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      type="text"
                      id="lastName"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Gender
                    </label>
                    <div className="dropdown dropdown-bottom">
                      <div tabIndex={0} role="button" className="btn m-1">{gender || "Select Gender"}</div>
                      <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li><button onClick={() => setGender("male")}>Male</button></li>
                        <li><button onClick={() => setGender("female")}>Female</button></li>
                        <li><button onClick={() => setGender("others")}>Others</button></li>
                      </ul>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="about" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      About
                    </label>

                  </div>
                  <label className="form-control">
                    <div className="label">

                      {/* <span className="label-text-alt">Alt label</span> */}
                    </div>
                    <textarea className="textarea textarea-bordered h-24" placeholder="About You" value={about} onChange={(e) => setAbout(e.target.value)} ></textarea>
                  </label>

                  <div>
                    <label htmlFor="age" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Age
                    </label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      id="age"
                      className="input-field"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="photoUrl" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Photo URL
                    </label>
                    <input
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      type="text"
                      id="photoUrl"
                      className="input-field"
                      required
                    />
                  </div>

                  {error && <div className="text-red-500">{error}</div>}

                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    Save Data
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <UserCard user={{ firstName, lastName, gender, age, about, photoUrl }} />

      {showToast && <div className="toast toast-top toast-center">
        <div className="alert alert-success">
          <span>User Profile saved Successfully.</span>
        </div>
      </div>}
    </div>
  );
};

export default EditProfile;
