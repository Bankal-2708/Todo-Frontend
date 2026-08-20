import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/Index'
 

function SignIn() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false)

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const change = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const submit = async (e) => {
    e.preventDefault();

    // Empty fields check
    if (!inputs.email || !inputs.password) {
      toast.error("Email and password are required");
      return;
    }

    try {

      const response = await axios.post(
        "http://localhost:3000/api/v1/signin",
        {
          email: inputs.email,
          password: inputs.password
        }
      );

      // console.log("LOGIN SUCCESS:", response.data);

      toast.success(response.data.message);
      const userId = response.data.user._id;
      sessionStorage.setItem("id", userId);

      dispatch(authActions.login( ))

      // console.log("USER ID:", userId);

      // Clear inputs
      setInputs({
        email: "",
        password: ""
      });

      // Go to Todo page
      setTimeout(() => {
        navigate("/todo");
      }, 500);

    } catch (error) {

      console.log(
        "LOGIN ERROR:",
        error.response?.data
      );

      toast.error(
        error.response?.data?.error || "Login failed"
      );
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">

      <ToastContainer />

      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Sign in to continue to your Todo account
        </p>

        <form
          className="mt-8"
          onSubmit={submit}
        >

          {/* Email */}
          <div className="mb-5">

            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={inputs.email}
              onChange={change}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600"
            />

          </div>


          {/* Password */}
          <div className="relative mb-5">

            <label className="block font-medium mb-2">
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={inputs.password}
              onChange={change}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 outline-none focus:border-blue-600"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2/3 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </button>

          </div>


          {/* Forgot Password */}
          <div className="flex justify-end mb-6">

            <button
              type="button"
              className="text-blue-600 text-sm hover:underline mt-1"
            >
              Forgot Password?
            </button>

          </div>


          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>


        <p className="text-center text-gray-500 mt-6">

          Don't have an account?{" "}

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