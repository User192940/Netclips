import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import Drawer from './Drawer'

const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()
  const [drawer, openDrawer] = useState()

  const handleLogout = async () => {
    openDrawer(!drawer)
    try{
      await logOut()
      navigate('/index.html')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="flex items-center justify-between p-4 w-full fixed sm:absolute z-[100] sm:bg-transparent bg-black">
      <button
        onClick={() => openDrawer(!drawer)}
        className="sm:hidden nav-main-menu-toggle"
        aria-label="Open Menu"
        aria-controls="nav-main-menu"
        aria-expanded="false"
      >
        <svg viewBox="0 0 48 48" width="48" height="48">
          <rect x="6" y="12" width="36" height="4" rx="2" fill="white"></rect>
          <rect x="6" y="22" width="36" height="4" rx="2" fill="white"></rect>
          <rect x="6" y="32" width="36" height="4" rx="2" fill="white"></rect>
        </svg>
      </button>
      <Drawer drawer={drawer} openDrawer={openDrawer} handleLogout={handleLogout} user={user}/>
      <Link to="/index.html" onClick={() => {if(drawer){openDrawer(!drawer)}}}> 
        <h1 className="text-red-600 text-4xl font-bold cursor-pointer">
          NETCLIPS
        </h1>
      </Link>
      {user?.email ? (
        <div className="hidden sm:flex">
          <Link to="/account">
            <button className="text-white items-center pr-4 py-2">
              Account
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="hidden sm:flex">
          <Link to="/login">
            <button className="text-white pr-4 py-2">Sign In</button>
          </Link>
          <Link to="/signup">
            <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar