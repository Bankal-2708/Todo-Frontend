import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'


function SignIn() {
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">

      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue to your Todo account
        </p>


        <form className="mt-8">

          <div className="mb-5">

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600"
            />

          </div>


          <div className="relative">
            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
            </button>
          </div>



          <div className="flex justify-end mb-6">

            <button
              type="button"
              className="text-blue-600 text-sm hover:underline mt-1"
            >
              Forgot Password?
            </button>

          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>


        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{' '}

          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  )
}

export default SignIn