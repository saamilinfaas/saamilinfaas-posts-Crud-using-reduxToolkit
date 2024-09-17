import React from 'react'
import { useDispatch } from 'react-redux';
import { addReaction } from './postsSlice';

const reactionEmoji = {
    thumbsUp:"👍",
    wow:"🫨",
    heart:"❤",
    rocket:"🚀",
    coffee:"☕"
}

const ReactionButtons = ({post}) => {

    const dispatch = useDispatch();
 const reactionButtons = Object.entries(reactionEmoji).map(([reaction,emoji])=>{
    return (
        <button key={reaction} type='button' className='reactionButton' onClick={()=>dispatch(addReaction({reaction,postId:post.id}))}>{emoji} {post.reactions[reaction]}</button>
    )
 });

  return (
    <div>
        {reactionButtons}

    </div>
  )
}

export default ReactionButtons