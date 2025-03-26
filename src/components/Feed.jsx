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
    // console.log(feed);
    if (feed && Object.keys(feed).length > 0) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true })
      dispatch(addFeed(res.data))
      console.log(res.data)

    } catch (err) {
      console.error(err)
    }

  }

  useEffect(() => {
    getFeed();
    console.log("getfeed called")
  }, [])
  return feed && (<>
    <div>
      <UserCard user={feed.data[0]} />
    </div>


  </>
  )
}

export default Feed