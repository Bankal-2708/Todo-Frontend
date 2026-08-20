import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import { GiBookAura } from "react-icons/gi"
import { FiMenu, FiX } from "react-icons/fi"
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/Index'

function Navbar() {

  // const isLoggedIn = useSelector((state) => state.isLoggedIn)

  const [menuOpen, setMenuOpen] = useState(false)

  const menuRef = useRef(null)

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }

    }

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }

  }, [])

  const closeMenu = () => {
    setMenuOpen(false)
  }
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);

  const dispatch = useDispatch()
  const logout = () => {
     sessionStorage.removeItem("id");
    dispatch(authActions.logout());
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-100 border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-16">

          <Link
            to="/"
            onClick={closeMenu}
            className="text-3xl font-semibold text-orange-800 flex items-center gap-3"
          >
            <GiBookAura />
            todo
          </Link>

          <div className="hidden md:flex items-center space-x-6">

            <Link
              to="/"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              Home
            </Link>

            <Link
              to="/about"
              className="text-blue-600 font-medium hover:text-blue-800"
            >
              About Us
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
                >
                  Sign Up
                </Link>

                <Link
                  to="/signin"
                  className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg font-medium"
                >
                  Sign In
                </Link>
              </>
            )}

            {isLoggedIn && (
              <>
                <Link
                  to="/todo"
                  className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium"
                >
                  Todo
                </Link>

                <button
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg font-medium"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}

          </div>

          <div
            ref={menuRef}
            className="md:hidden"
          >

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-3xl text-gray-700"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>

            {menuOpen && (

              <div className="absolute right-4 top-16 w-48 bg-white border rounded-lg shadow-lg p-3 flex flex-col gap-3">

                <Link
                  to="/"
                  onClick={closeMenu}
                  className="text-blue-600"
                >
                  Home
                </Link>

                <Link
                  to="/about"
                  onClick={closeMenu}
                  className="text-blue-600"
                >
                  About Us
                </Link>

                {!isLoggedIn && (
                  <>
                    <Link
                      to="/signup"
                      onClick={closeMenu}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg"
                    >
                      Sign Up
                    </Link>

                    <Link
                      to="/signin"
                      onClick={closeMenu}
                      className="px-3 py-2 border border-blue-600 text-blue-600 rounded-lg"
                    >
                      Sign In
                    </Link>
                  </>
                )}

                {isLoggedIn && (
                  <>
                    <Link
                      to="/todo"
                      onClick={closeMenu}
                      className="text-blue-600"
                    >
                      Todo
                    </Link>

                    <button
                      className="px-3 py-2 bg-gray-800 text-white rounded-lg"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </nav>
  )
}

export default Navbar