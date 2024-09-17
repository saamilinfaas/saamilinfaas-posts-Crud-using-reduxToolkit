import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from './postsSlice';

import PostAuthor from './PostAuthor';
import ReactionButtons from './ReactionButtons';
import Aos from 'aos';
import 'aos/dist/aos.css';

const SinglePost = () => {
  const {postId} = useParams();
  
  const post = useSelector((state)=>selectPostById(state,Number(postId)));

  useEffect(()=>{
    Aos.init({duration:1500});
  })
  

  if(!post){
    return (
    <section>
      <h2>Post Not found</h2>
    </section>
  )
  }

  return (
    <section data-aos='zoom-in'>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <PostAuthor userId={post.userId}/>
      <ReactionButtons post={post}/>
      <Link to={`/edit/${post.id}`}>Edit Post</Link>
    </section>
  )
}

export default SinglePost