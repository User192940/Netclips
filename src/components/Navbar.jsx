import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Navbar = () => {
  const {user, logOut} = UserAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try{
      await logOut()
      navigate('/index.html')
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className='flex items-center justify-between p-4 w-full absolute z-[100]'>
      <Link to='/index.html'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>NETCLIPS</h1>
      </Link>
        {user?.email ? (<div className='hidden sm:flex'>
          <Link to='/account'>
            <button className='text-white items-center pr-4 py-2'>Account</button>
            </Link>
            <button onClick={handleLogout} className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Logout</button>
        </div>) : (<div className='hidden sm:flex'>
          <Link to='/login'>
            <button className='text-white pr-4 py-2'>Sign In</button>
            </Link>
            <Link to='/signup'>
            <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>Sign Up</button>
            </Link>
        </div>)}
    </div>
  )
}

export default Navbar