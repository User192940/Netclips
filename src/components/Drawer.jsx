import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Drawer = ({drawer, openDrawer, handleLogout, user}) => {
    const location = useLocation();
  return (
    <nav id="nav-main-menu" className={drawer ? "show-drawer" : "hidden"}>
        <ul className='flex flex-col'>
          <li>
            <Link onClick={() => {openDrawer(!drawer)}}
              className={`${(location.pathname === '/index.html') ? "text-white" : "text-gray-400"} text-lg font-bold cursor-pointer`}
              to="/index.html"
            >
              Home
            </Link>
          </li>
            {user?.email ? (<li>
              <Link to="/account">
                    <button onClick={() => {openDrawer(!drawer)}} className={`${(location.pathname === '/account') ? "text-white" : "text-gray-400"} text-lg font-bold cursor-pointer`}>
                      Account
                    </button>
                  </Link>
            </li>) : null}
          <li className='mt-auto'>
              {user?.email ? (
                <div className="flex flex-col w-full gap-2 sm:hidden">
                  <button
                    onClick={handleLogout}
                    className="mt-auto bg-red-600 px-6 py-2 rounded cursor-pointer text-white"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col w-full gap-2 sm:hidden">
                  <Link to="/login">
                    <button onClick={() => {openDrawer(!drawer)}} className="border-2 w-full border-zinc-400 px-6 py-2 rounded cursor-pointer text-white">Sign In</button>
                  </Link>
                  <Link to="/signup">
                    <button onClick={() => {openDrawer(!drawer)}} className="bg-red-600 w-full px-6 py-2 rounded cursor-pointer text-white">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
          </li>
        </ul>
      </nav>
  )
}

export default Drawer