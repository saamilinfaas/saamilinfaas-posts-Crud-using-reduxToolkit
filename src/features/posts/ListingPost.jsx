import React, { useEffect } from 'react'
import ReactionButtons from './ReactionButtons'
import { Link } from 'react-router-dom'
import { formatDistanceToNow, parseISO } from 'date-fns';
import Aos from 'aos';
import 'aos/dist/aos.css'



const ListingPost = ({posts}) => {
  useEffect(()=>{
    Aos.init({duration:1000});
  },[])
  return (
    <section>
        {posts.map(post=>(
            <article className='post'  key={post.id} data-aos='fade-up'>
            <h4 className='title'>{post.title.toUpperCase()}</h4>
            <p className='body'>{post.body.substring(0,100)}{post.body.length >100 && <span>....</span>}</p>
            {post.date ? <p>{formatDistanceToNow(parseISO(post.date))} ago</p> : null}
            <p><Link to={`/post/${post.id}`}>View Post</Link></p>
            
            <ReactionButtons post={post}/>
            
        </article>)
        )}
    </section>
  )
}

export default ListingPost