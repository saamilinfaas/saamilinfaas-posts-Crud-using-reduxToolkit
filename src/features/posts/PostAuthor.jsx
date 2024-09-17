import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/userSlice'

const PostAuthor = ({userId}) => {
    const user = useSelector((state)=>selectUserById(state,userId));
    if(!user){
        return <div>Unknown Author</div>
    }
  return (
    <div>{user.name}</div>
  )
}

export default PostAuthor