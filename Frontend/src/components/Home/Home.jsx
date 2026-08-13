import React from 'react'

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center max-w  mx-auto px-4 sm:px-6 lg:px-8">


      <div className="text-center ">

        <h1 className="text-7xl font-semibold leading-tight">
          Organize your <br />
          work and life, finally.
        </h1>

        <p className="mt-4 text-xl">
          Become focused, organized, and calm with <br />
          todo app. The World's #1 task manager app.
        </p>

        <button className="mt-5 bg-amber-700 rounded-md py-2 px-2 font-semibold text-xl text-white hover:bg-orange-500">
          Make Todo List
        </button>

      </div>

    </div>
  )
}

export default Home