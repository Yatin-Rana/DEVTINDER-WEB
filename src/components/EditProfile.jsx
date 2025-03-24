import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'

const EditProfile = () => {
    const user = useSelector((store) => store.user)
const dispatch = useDispatch();
const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        gender: user.gender
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.patch(BASE_URL + '/profile/edit', {
            formData
        }, { withCredentials: true })
        dispatchEvent(addUser(response.data))
        Navigate('/profile')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.firstName} onChange={(e) => e.target.value} />
                <input type="text" value={formData.lastName} onChange={(e) => e.target.value} />

                <input type="text" value={formData.age} onChange={(e) => e.target.value} />
                <input type="text" value={formData.gender} onChange={(e) => e.target.value} />
                <button type='submit'> submit</button>
            </form>
        </div>
    )
}

export default EditProfile