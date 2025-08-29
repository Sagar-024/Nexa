import React from "react";
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";

function Card({ place }) {
  if (!place) return null;

  return (
    <div
      className="w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden flex flex-col
        bg-gradient-to-br from-[#252545] to-[#181824]
        shadow-lg ring-1 ring-blue-700/10"
      style={{ minHeight: "470px" }}
    >
      {/* Tall Image */}
      <div className="relative w-full" style={{ height: "290px" }}>
        <img
          src={place.image?.imageUrl}
          alt={place.name}
          className="object-cover w-full h-full"
          loading="lazy"
          style={{ minHeight: 240, maxHeight: 310 }}
        />
        {place.best_months && (
          <div className="absolute top-4 right-4 bg-neutral-900/90 px-4 py-1 rounded-xl text-sm font-semibold text-white shadow-md select-none">
            {place.best_months?.slice(0, 2).join(", ")}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col justify-between p-6">
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-1">{place.name}</h2>
          <p className="text-gray-300 text-base mb-4">{place.short_reason}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-3 mt-1">
            {(place.primary_vibes || []).map((vibe) => (
              <span
                key={vibe}
                className="bg-gradient-to-br from-blue-700 via-purple-500 to-pink-500 text-white rounded-full px-3 py-1 text-xs font-semibold"
              >
                {vibe}
              </span>
            ))}
          </div>
          <div className="flex justify-between items-center text-white/80 text-sm">
            <span>
              ₹{place.est_daily_cost_per_person?.min}–{place.est_daily_cost_per_person?.max}
              <span className="ml-1 text-xs text-gray-400 font-normal">/person/day</span>
            </span>
            <span className="flex items-center gap-4">
              <FaRegBookmark className="hover:text-yellow-300 transition" />
              <FaShareAlt className="hover:text-pink-400 transition" />
            </span>
          </div>
        </div>
        {place.image && (
          <div className="mt-6 flex items-center text-gray-400 text-xs italic bg-black/10 rounded-lg px-2 py-1">
            <span>By&nbsp;
              <a
                href={place.image.photographerProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-300 underline ml-1"
              >
                {place.image.photographer || "Contributor"}
              </a>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Card;
