import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getPosterror, getPostStatus, selectAllPosts } from './postsSlice';
//import './posts.css';
import AddPost from './AddPost';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { fetchUsers, getUsersStatus, selectAllUsers } from '../users/userSlice';
import ReactionButtons from './ReactionButtons';


const Posts = () => {
    const posts = useSelector(selectAllPosts);    
    const postStatus = useSelector(getPostStatus);
    const dispatch = useDispatch();
    const error = useSelector(getPosterror);
    const userStatus = useSelector(getUsersStatus);
    const users = useSelector(selectAllUsers);
    console.log(users);

    useEffect(()=>{
        console.log('calling use effect')
        if(postStatus === 'idle'){
            dispatch(fetchPosts());
        }
        if(userStatus === 'idle'){
            dispatch(fetchUsers());
        }
    },[postStatus,dispatch,fetchUsers]);

    /* const getUserById = (userId)=>{
        const user = users.filter(user =>  user.id == userId);
        console.log("user Name",user.name);
        return user.name;
    } */

    let content;
    if(postStatus==='loading'){
        content = <p>loading......</p>
    }else if(postStatus==='succeeded'){
        content = [...posts].map(post=>{
            const userName =   users.filter(user=>user.id === post.userId)[0]?.name ;
                   
           return ( <article className='post'  key={post.id}>
                <h4 className='title'>{post.title.toUpperCase()}</h4>
                <p className='body'>{post.body.substring(0,100)}{post.body.length >100 && <span>....</span>}</p>
                {post.date ? <p>{formatDistanceToNow(parseISO(post.date))} ago</p> : null}
                {post.userId ? (<p>{post.userId}: {userName}</p>) : <p>{post.userId}</p>}
                <ReactionButtons post={post}/>
                
            </article>)
        })
    }else if(postStatus === 'failed'){
        content = <p>{error}</p>
    }

  return (
    <div className='postsjsx'>
        <h3>Posts</h3>
        <div className='addpost'>
            <AddPost/>
        </div>
        {/* <div className='posts'>
            {posts.map(post=>(
                <div className='post'  key={post.id}>
                    <h4 className='title'>{post.title.toUpperCase()}</h4>
                    <p className='body'>{post.body.substring(0,100)}{post.body.length >100 && <span>....</span>}</p>
                    <p>{formatDistanceToNow(parseISO(post.date))} ago</p>
                </div>
            ))}

        </div> */}
        <div className="posts">
            {content}
            </div>
    </div>
  )
}

export default Posts;


