import React from "react";
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";

function Card({ place }) {
  if (!place) return null;

  // Dynamic border color based on vibe/category (optional)
  // You can extend this or set per card type in data
  const borderColor =
    place.primary_vibes?.includes("tech")
      ? "border-cyan-900"
      : place.primary_vibes?.includes("culture")
      ? "border-amber-900"
      : "border-neutral-800";

  return (
    <div
      className={`
        w-full max-w-[420px] mx-auto rounded-2xl overflow-hidden flex flex-col
       bg-neutral-900
       border-1 border-neutral-500
        transition-all duration-300 p-3 mb-3
      `}
      style={{ minHeight: "400px" }}
    >
      {/* Big Image */}
      <div className="relative w-full  " style={{ height: "240px" }}>
        <img
          src={place.image?.imageUrl}
          alt={place.name}
          className="object-cover w-full h-full rounded-2xl"
          loading="lazy"
          style={{ minHeight: 160, maxHeight: 240 }}
        />
        {place.best_months && (
          <div className="absolute top-4 right-4 bg-black/70 px-4 py-1 rounded-xl text-sm font-semibold text-white shadow-md select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}>
            {place.best_months?.slice(0, 2).join(", ")}
          </div>
        )}
      </div>
      
      {/* Card Body: */}
      <div className=" flex flex-col justify-between px-5 py-4 gap-2">
        {/* Place Name */}
        <h2
          className=" font-extrabold bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent text-2xl  leading-snug  tracking-tight"
          style={{ fontFamily: "'Stardos Stencil', 'Inter', sans-serif" }}
        >
          {place.name}
        </h2>
        {/* Description */}
        <p
          className="text-gray-200 text-[0.9rem] leading-tight mb-2"
          style={{ fontFamily: "'IBM Plex Mono', 'Menlo', monospace" }}
        >
          {place.short_reason}
        </p>
        {/* Chips and Price Row */}
        <div className="flex flex-row flex-wrap gap-2 items-center mb-2">
          {(place.primary_vibes || []).map((vibe) => (
            <span
              key={vibe}
              className="rounded-full px-3 py-0.5 bg-[#22253C] text-gray-100 text-xs font-medium"
              style={{
                fontFamily: "'IBM Plex Mono', 'monospace'",
                letterSpacing: "0.01em"
              }}
            >
              {vibe}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-white/80 text-[15px] mt-2">
          <span className="font-semibold font-mono">
            ₹{place.est_daily_cost_per_person?.min}–{place.est_daily_cost_per_person?.max}
            <span className="ml-1 text-xs text-gray-400 font-normal font-sans">/person/day</span>
          </span>
          <span className="flex items-center gap-4">
            <FaRegBookmark className="hover:text-yellow-300 transition" />
            <FaShareAlt className="hover:text-sky-400 transition" />
          </span>
        </div>
       
      
      </div>
    </div>
  );
}

export default Card;
