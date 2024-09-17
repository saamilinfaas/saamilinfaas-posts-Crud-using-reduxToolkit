import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header>
        <nav>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/post'>Add Post</Link></li>
                <li><Link to='/users'>Users</Link></li>
            </ul>
        </nav>
    </header>
  )
}

