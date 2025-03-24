import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const [emailId, setEmailId] = useState("yatinrana@example.com")
    const [password, setPassword] = useState("StrongPass@123")
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        try {
            const response = await axios.post(BASE_URL+"/login",
                { emailId, password },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            console.log("Success:", response.data);
            dispatch(addUser(response.data))
            navigate('/feed');
            setEmailId('');
            setPassword('');
        } catch (err) {
            console.error("An error occurred:", err);
        }
    };

    return (
        <div>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-6 mx-auto md:h-screen lg:py-0">
                    <div className='sm:h-[100vh] justify-start mt-12 md:h-screen w-full flex flex-col items-center md:mt-16'>
                        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
                            DevTinder
                        </a>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Login to your account
                                </h1>
                                {/* Removed action="#" */}
                                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                                    <div>
                                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Your email
                                        </label>
                                        <input
                                            value={emailId}
                                            onChange={(e) => setEmailId(e.target.value)}
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="name@company.com"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Password
                                        </label>
                                        <input
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            type="password"
                                            name="password"
                                            id="password"
                                            placeholder="••••••••"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                                                    Remember me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                                        Login
                                    </button>
                                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                        Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login;
