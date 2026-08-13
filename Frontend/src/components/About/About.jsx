import React from 'react'
import { GiBookAura } from "react-icons/gi"
import { FiCheckCircle, FiTarget, FiClock, FiUsers } from "react-icons/fi"

function About() {
  return (
    <div className="w-full min-h-screen">

       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">

        <div className="text-center max-w-3xl mx-auto">

          <div className="flex justify-center items-center gap-2 text-orange-800 mb-5">
            <GiBookAura className="text-4xl" />

            <span className="text-2xl font-bold">
              todo
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Organize your work.
            <br />
            Simplify your life.
          </h1>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Todo is a simple and powerful task management app designed
            to help you organize your tasks, stay focused, and get more
            things done every day.
          </p>

        </div>

      </section>


       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">

        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>

            <h2 className="text-3xl font-bold">
              Why Todo?
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Managing daily tasks can sometimes become difficult.
              Todo helps you keep everything in one place so you can
              focus on what actually matters.
            </p>

            <p className="mt-4 text-gray-600 leading-7">
              Whether you are managing your personal tasks, planning
              your studies, or working on a project, Todo makes it
              easier to create, organize, and complete your tasks.
            </p>

          </div>


           <div className="grid sm:grid-cols-2 gap-5">

            <div className="border border-gray-200 rounded-xl p-6">
              <FiCheckCircle className="text-3xl text-green-600" />

              <h3 className="mt-4 font-bold text-xl">
                Stay Organized
              </h3>

              <p className="mt-2 text-gray-600">
                Keep all your tasks organized in one place.
              </p>
            </div>


            <div className="border border-gray-200 rounded-xl p-6">
              <FiTarget className="text-3xl text-blue-600" />

              <h3 className="mt-4 font-bold text-xl">
                Stay Focused
              </h3>

              <p className="mt-2 text-gray-600">
                Focus on your important tasks without distractions.
              </p>
            </div>


            <div className="border border-gray-200 rounded-xl p-6">
              <FiClock className="text-3xl text-orange-600" />

              <h3 className="mt-4 font-bold text-xl">
                Save Time
              </h3>

              <p className="mt-2 text-gray-600">
                Plan your day and complete your tasks efficiently.
              </p>
            </div>


            <div className="border border-gray-200 rounded-xl p-6">
              <FiUsers className="text-3xl text-purple-600" />

              <h3 className="mt-4 font-bold text-xl">
                For Everyone
              </h3>

              <p className="mt-2 text-gray-600">
                Perfect for students, professionals, and everyday use.
              </p>
            </div>

          </div>

        </div>

      </section>


       <section className="bg-gray-50 border-t border-gray-200">

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">

          <h2 className="text-3xl font-bold">
            Our Mission
          </h2>

          <p className="mt-5 text-gray-600 text-lg leading-8">
            Our mission is simple — make task management easy,
            intuitive, and accessible so that everyone can spend
            less time managing tasks and more time achieving their goals.
          </p>

        </div>

      </section>


    </div>
  )
}

export default About