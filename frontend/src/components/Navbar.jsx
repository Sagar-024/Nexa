import React, { useState } from "react";
import { FaUser, FaUsers, FaRobot, FaRegSun, FaSignInAlt, FaBars } from "react-icons/fa";
import Vortex from "./Vortex.jsx";

function Navbar() {
  const [navActive, setNavActive] = useState(0);
  const [open, setOpen] = useState(false);


  const handleThemeToggle = () => alert("Theme toggled!");
  const handleSignIn = () => alert("Open sign in/up…");

  return (
    <div className="relative px-4 py   pt-5 w-full sm:px-10 md:px-15 lg:px-24 px:2  flex justify-between items-center mx-auto  h-20 bg-black ">


      


      <nav className="   flex items-center bg-[#18181b]/90 border border-[#23232a] rounded-2xl shadow-lg px-2 py-1 w-max">
       
        <button
          onClick={() => setNavActive(0)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-semibold focus:outline-none text-base
              ${navActive === 0 ? "bg-[#23232a] text-white scale-105" : "text-gray-300 hover:text-white"}
            `}
        >
          <FaRobot className="text-lg sm:text-xl" />
          {navActive === 0 && <span className="ml-1 font-semibold">AI</span>}
        </button>
        {/* Divider */}
        <div className="w-px h-7 bg-[#333] mx-2" />
        {/* Solo Trip */}
        <button
          onClick={() => setNavActive(1)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-semibold focus:outline-none text-base
              ${navActive === 1 ? "bg-[#23232a] text-white scale-105" : "text-gray-300 hover:text-white"}
            `}
        >
          <FaUser className="text-lg sm:text-xl" />
          {navActive === 1 && <span className="ml-1 font-semibold">Solo</span>}
        </button>
        {/* Group Trip */}
        <button
          onClick={() => setNavActive(2)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all font-semibold focus:outline-none text-base
              ${navActive === 2 ? "bg-[#23232a] text-white scale-105" : "text-gray-300 hover:text-white"}
            `}
        >
          <FaUsers className="text-lg sm:text-xl" />
          {navActive === 2 && <span className="ml-1 font-semibold">Group</span>}
        </button>
      </nav>
      <div >
        <button
          onClick={() => setOpen((o) => !o)}
          className="w-10 h-10 rounded-full flex items-center justify-center
            bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 shadow-xl ring-2 ring-[#222]
            transition-transform hover:scale-110"
          aria-label="Menu"
        >
          <FaBars className="text-white text-xl" />
        </button>
        {open && (
          <div className="absolute right-0 mt-3 bg-[#111] border border-[#23232a] rounded-xl py-3 w-48 shadow-lg animate-fade-in z-50">
            <button
              onClick={() => { setOpen(false); handleThemeToggle(); }}
              className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#23232a] text-gray-200"
            >
              <FaRegSun /> Light/Dark Mode
            </button>
            <button
              onClick={() => { setOpen(false); handleSignIn(); }}
              className="flex items-center gap-3 w-full px-4 py-2 hover:bg-[#23232a] text-gray-200"
            >
              <FaSignInAlt /> Sign In / Up
            </button>
          </div>
        )}
      </div>



    </div>
  );
}

export default Navbar;
