import React, { useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'


const Layout = () => {
  useEffect(()=>{
    
  },[]);


  return (
    < >
      
        <Header/>
        <main className='App'>
            <Outlet />
        </main>
       
    </>
  )
}

export default Layout