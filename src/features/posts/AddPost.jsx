import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectAllUsers } from '../users/userSlice';
import { addPost } from './postsSlice';
//import './addPost.css';
import { IoMdCloseCircle } from "react-icons/io";
import { IoIosAddCircleOutline } from "react-icons/io";

const AddPost = () => {

    const [title,setTitle] = useState('');
    const [body,setBody] = useState('');
    const [userId,setUserId] = useState(0);
    const users = useSelector(selectAllUsers);
    const dispatch = useDispatch();
    const [showAddPost,setShowAddPost] = useState(false);
    
    const createPost = (e)=>{
        e.preventDefault();
        dispatch(addPost({title,body,userId}));
        setTitle('');
        setUserId(0);
        setBody('');
    }

  return (
    <div className='container'>
        {showAddPost && <form action="">
            <IoMdCloseCircle onClick={()=>{setShowAddPost(false)}} className='icon'/>
            <div className='formGroups'>
                <label htmlFor="title">Title: </label>
                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}/>
            </div>
            <div className='formGroups'>
                <label htmlFor="body">Body: </label>
                <textarea type="text" value={body} onChange={e=>setBody(e.target.value)}/>
            </div>
            <div className="formGroups">
                <label htmlFor="userId">User: </label>
                <select name="userId" id="userId" value={userId} onChange={e=>setUserId(Number(e.target.value))}>
                    <option value=""></option>
                    {users.map(user=>(
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={(e)=>createPost(e)}>Add Post</button>
        </form>}
        {!showAddPost && <h5>Add post <IoIosAddCircleOutline onClick={()=>setShowAddPost(true)} className='icon'/></h5> }
    </div>
  )
}

export default AddPost