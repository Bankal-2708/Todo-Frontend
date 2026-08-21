import React from 'react'
import { GiBookAura } from "react-icons/gi";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 w-full">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="min-h-16 flex items-center justify-center gap-2">

           
          <div className="flex items-center gap-2">
            <GiBookAura className="text-orange-800 text-2xl" />

            <h1 className="font-extrabold text-2xl">
              todo
            </h1>
          </div>

          {/* Copyright */}
          <h3 className="font-bold text-lg">
            &copy; VBtechcode
          </h3>

        </div>

      </div>

    </footer>
  )
}

export default Footer