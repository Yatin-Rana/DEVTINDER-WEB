import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0); // Track the visible card

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', { withCredentials: true });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.error("Error fetching feed:", err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Function to move to the next card
  const handleNextCard = () => {
    if (currentIndex < feed.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh] ">
      {feed.length > 0 && currentIndex < feed.length ? (
        <UserCard user={feed[currentIndex]} onAction={handleNextCard} />
      ) : (
        <p className="text-white text-xl">No more users in the feed.</p>
      )}
    </div>
  );
};

export default Feed;
