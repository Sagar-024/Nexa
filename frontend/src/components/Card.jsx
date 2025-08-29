import React from "react";
import { FaRegBookmark, FaShareAlt } from "react-icons/fa";

function Card({ place }) {
  if (!place) return null;

  return (
    <div
      className="w-full max-w-[420px] mx-auto rounded-3xl overflow-hidden flex flex-col
        bg-neutral-900 shadow-xl border border-neutral-800"
      style={{ minHeight: "420px" }}
    >
      {/* Tall Image */}
      <div className="relative w-full" style={{ height: "260px" }}>
        <img
          src={place.image?.imageUrl}
          alt={place.name}
          className="object-cover w-full h-full"
          loading="lazy"
          style={{ minHeight: 200, maxHeight: 280 }}
        />
        {place.best_months && (
          <div className="absolute top-4 right-4 bg-black/80 px-4 py-1 rounded-xl text-sm font-semibold text-white shadow-lg select-none">
            {place.best_months?.slice(0, 2).join(", ")}
          </div>
        )}
      </div>

      {/* Card Body (tight, crisp, creative fonts) */}
      <div className="flex-1 flex flex-col justify-between p-5">
        <div>
          <h2
            className="text-white text-xl font-extrabold mb-1 tracking-tight"
            style={{ fontFamily: "'Stardos Stencil', 'Inter', sans-serif", letterSpacing: "-0.01em" }}
          >
            {place.name}
          </h2>
          <p
            className="text-gray-300 text-[0.99rem] mb-3 leading-tight"
            style={{ fontFamily: "'IBM Plex Mono', 'Menlo', 'Monaco', 'monospace'" }}
          >
            {place.short_reason}
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2 mt-2">
          <div className="flex flex-wrap gap-2">
            {(place.primary_vibes || []).map((vibe) => (
              <span
                key={vibe}
                className="bg-gray-800/90 text-gray-100 rounded-full px-2.5 py-0.5 text-[12px] font-medium font-mono"
              >
                {vibe}
              </span>
            ))}
          </div>
          <span className="text-white/85 font-bold text-sm">
            ₹{place.est_daily_cost_per_person?.min}–{place.est_daily_cost_per_person?.max}
            <span className="ml-1 text-xs text-gray-400 font-normal font-sans">/person/day</span>
          </span>
        </div>
        <div className="flex justify-end items-center gap-5 mt-3">
          <FaRegBookmark className="hover:text-yellow-300 transition" />
          <FaShareAlt className="hover:text-pink-400 transition" />
        </div>
        {place.image && (
          <div className="mt-3 flex items-center text-gray-400 text-xs italic bg-black/10 rounded-lg px-2 py-1">
            <span
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >By&nbsp;
              <a
                href={place.image.photographerProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-300 underline ml-1"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
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
