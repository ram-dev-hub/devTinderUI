import React from 'react'
import NavBar from './nav-bar'
import Footer from './footer'
import { Outlet } from 'react-router-dom'

const Body = () => {
  return (
    <div data-theme="dark" className='flex flex-col h-screen'>
        <NavBar>

        </NavBar>
        <Outlet/>


        <Footer></Footer>
      
    </div>
  )
}

export default Body
