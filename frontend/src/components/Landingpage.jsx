import React from 'react'
import i1 from '../assets/i1.jpg'
import i2 from '../assets/i2.jpg'
import i3 from '../assets/i3.jpg'
import i4 from '../assets/i4.jpg'
import { NavLink } from 'react-router-dom'
import { ArrowRight } from "lucide-react"



function Landingpage() {
  return (
<div className="w-full h-screen flex items-center justify-center">
  <img
    src={i1}
    alt="Landing Visual"
    className="  absolute top-0  h-full w-full max-w-sm object-cover rounded-lg shadow-lg"
  />

   <div className="absolute top-0  w-full h-full bg-black opacity-20"></div>

   <div className='absolute  top-20'  style={{
              fontFamily: "'Playfair Display', serif",
              textShadow: '2px 2px 12px rgba(0, 0, 0, 1)',
            }}
          >

        <p   className="text-3xl  text-white leading-tight  "> it,s a Big world </p>   
        <h1 className="text-6xl font-bold text-white leading-tight  "> Out There <br /> GO Explore  </h1>  
        
   </div>

   <NavLink
  to="/home"
  className="absolute bottom-10 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-8 py-3 rounded-full bg-blue-700 text-white font-bold text-lg shadow-[1px_1px_20px_rgba(0,0,0,1)] 
             hover:bg-blue-900 hover:scale-105 transition-all duration-200 ease-in-out focus:outline-none z-20"
  style={{
    fontFamily: "'Playfair Display', serif",
    textShadow: '1px 1px 8px rgba(0, 0, 0, 0.55)',
  }}
>
  Get Started
  <ArrowRight size={26} className="ml-2" />
</NavLink>




</div>




  )
}

export default Landingpage