import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

const Feed = () => {
  const feed = useSelector((store) => store.feed)
  const dispatch = useDispatch()

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true })
      console.log("API Response:", res.data) // 🛠 Debugging step
      dispatch(addFeed(res.data))  
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  }

  useEffect(() => {
    getFeed();
  }, [])

  useEffect(() => {
    console.log("Updated Feed:", feed) // Log Redux state to see changes
  }, [feed])

  return (
    <div>
      {feed.length > 0 ? feed.map((user) => <UserCard key={user._id} user={user} />) : <p>Loading...</p>}
    </div>
  )
}

export default Feed
