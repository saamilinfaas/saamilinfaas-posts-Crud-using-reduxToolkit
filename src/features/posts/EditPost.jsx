import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom'
import { selectPostById, updatePost } from './postsSlice';
import { selectAllUsers } from '../users/userSlice';
import { useNavigate } from "react-router-dom";
import Aos from 'aos';

const EditPost = () => {

  useEffect(()=>{
    Aos.init({duration:2000});
  })
  const {postId} = useParams();
  const post =  useSelector(state=>selectPostById(state,Number(postId)));

  const users = useSelector(selectAllUsers);
  const [title,setTitle] = useState(post?.title);
  const [body,setBody] = useState(post?.body);
  const [userId,setUserId] = useState(post?.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitEditPost = ()=>{
    dispatch(updatePost({title,body,userId,id:post.id,reactions:post.reactions})).unwrap();
    navigate('/');

  }
  
  
  if(!post){
    return (
      <h2>No post Found!</h2>
    )
  };  

   

  return (
    <section data-aos='zoom-in'>
      <form action="">
            
            <div className='formGroups' data-aos='fade-left'>
                <label htmlFor="title">Title: </label>
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className='formGroups' data-aos='fade-right'>
                <label htmlFor="body">Body: </label>
                <textarea type="text" value={body} onChange={e=>setBody(e.target.value)}/>
            </div>
            <div className="formGroups" data-aos='fade-left'>
                <label htmlFor="userId">User: </label>
                <select name="userId" id="userId" value={userId} onChange={e=>setUserId(Number(e.target.value))}>
                    <option value=""></option>
                    {users.map(user=>(
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={()=>submitEditPost()} type="button">Submit Edit</button>
        </form>
    </section>
  )

}


export default EditPost