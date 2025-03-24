import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'
import axios from 'axios'


const NavBar = () => {

  const user = useSelector(store => store.user)
  // console.log(user)
  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:7777/logout', {}, { withCredentials: true })
      console.log(response.data)
      dispatch(removeUser())
      navigate('/login')
    } catch (err) {
      console.error("error during logout", err.message)
    }
  }

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
       {user ? <Link to={'/feed'} className="btn btn-ghost text-xl" >🧑🏻‍💻DevTinder</Link> :<Link  className="btn btn-ghost text-xl" >🧑🏻‍💻DevTinder</Link> } 
      </div>
      {user && (<>
        <div className="flex-none gap-2 flex ">
          <div className='flex items-center'>
            <h2 className=' text-md  md:text-xl semibold' >welcome , {user.firstName}!</h2>
          </div>

          <div className="dropdown dropdown-end mx-5">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">


              <div className="w-24 flex space-between rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user.photoUrl} />
              </div>
            </div><ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li>
                <Link to={'/profile'} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li><Link>Settings</Link></li>
              <li><a onClick={handleLogout}>Logout</a></li>
            </ul>
          </div>
        </div>
      </>)
      }
    </div>

  )
}

export default NavBar