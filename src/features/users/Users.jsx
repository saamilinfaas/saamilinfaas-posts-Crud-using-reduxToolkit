import React from 'react'
import { useSelector } from 'react-redux'
import { selectAllUsers } from './userSlice'
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector(selectAllUsers);
  return (
    <section>
      <ol>
        {users.map(user=>(
          <li key={user.id}><Link to={`/users/${user.id}`}>{user.name}</Link></li>
        ))}
      </ol>
    </section>
  )
}

export default Users