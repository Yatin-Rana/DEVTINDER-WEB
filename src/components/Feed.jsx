import React from 'react'
import { useSelector } from 'react-redux'


const Feed = () => {
const user = useSelector((state)=>state.user);

  return (
    <div>Feed
      <div>
       <h2>{user.firstName}  {user.lastName} </h2>
       <h2>{user.age}</h2>
       <h2></h2>
      </div>
    </div>
  )
}

export default Feed