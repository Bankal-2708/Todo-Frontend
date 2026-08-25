import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { ToastContainer, toast } from 'react-toastify'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const change = (e) => {
    const { name, value } = e.target

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const submit = async (e) => {
    e.preventDefault();

    if (inputs.password !== inputs.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (inputs.password.length < 8) {
      toast.error("Password length should be grater than 8");
      return;
    }

    if (
      !/[a-z]/.test(inputs.password) ||
      !/[0-9]/.test(inputs.password) ||
      !/[!@#$%^&*(),.]/.test(inputs.password)
    ) {
      toast.error("Password doesn't match requirements");
      return;
    }
    try {
      const response = await axios.post(
        "/api/v1/register",
        {
          username: inputs.name,
          email: inputs.email,
          password: inputs.password
        }
      );

      console.log(response.data);

      toast.success(response.data.message);

      setInputs({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      });

      navigate("/signin");

    } catch (error) {
      console.log("BACKEND ERROR:", error.response?.data);

      if (error.response?.data?.error === "User already exists") {
        toast.error("User already exists. Please Sign In.");

        setTimeout(() => {
          navigate("/signin");
        }, 1000);

        return;
      }

      toast.error(
        error.response?.data?.error || "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 sm:mt-0 mt-15">

      {/* Toast */}
      <ToastContainer />

      <div className="w-full max-w-md border border-gray-200 rounded-xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2">
          Create your Todo account
        </p>

        <form onSubmit={submit} className="mt-8">

          {/* Name */}
          <div className="mb-5">
            <label className="block font-medium mb-2">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              onChange={change}
              value={inputs.name}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={change}
              value={inputs.email}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 outline-none focus:border-blue-600"
            />
          </div>

          {/* Password */}
          <div className="mb-5">

            <label className="block font-medium mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                onChange={change}
                value={inputs.password}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <FiEye /> : <FiEyeOff />}
              </button>

            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">

            <label className="block font-medium mb-2">
              Confirm Password
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                onChange={change}
                value={inputs.confirmPassword}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 pr-12 outline-none focus:border-blue-600"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <FiEye /> : <FiEyeOff />}
              </button>

            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition mt-3"
          >
            Sign Up
          </button>

        </form>

        <p className="text-center text-gray-500 mt-6">
          Already have an account?{" "}

          <Link
            to="/signin"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignUp