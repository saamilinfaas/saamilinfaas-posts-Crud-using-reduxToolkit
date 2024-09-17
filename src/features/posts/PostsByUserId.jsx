import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostByUser } from './postsSlice';
import ListingPost from './ListingPost';

const PostsByUserId = () => {
  const {userId} = useParams();
  const postsByUser = useSelector((state)=>selectPostByUser(state,Number(userId)));
  
  return (
    <ListingPost posts={postsByUser}/>
  )
}

export default PostsByUserId