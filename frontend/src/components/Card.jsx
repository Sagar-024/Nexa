import React from "react";

function Card({ place }) {
  if (!place) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl bg-[#161620] flex flex-col transition 
                 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-98 border border-blue-700/10 ring-1 ring-white/5 group"
      style={{ minHeight: 320 }}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={place.image?.imageUrl}
          alt={place.name}
          className="object-cover w-full h-full group-hover:scale-110 duration-300 transition"
          loading="lazy"
        />
        <div className="absolute top-2 right-2 bg-black/60 px-3 py-1 rounded-xl text-xs text-white font-mono tracking-wide">
          {place.best_months?.slice(0, 2).join(", ") || ""}
        </div>
        <div className="absolute inset-0 pointer-events-none group-hover:bg-gradient-to-t from-blue-900/30 to-transparent transition rounded-2xl" />
      </div>
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Name */}
          <div className="font-extrabold text-lg md:text-xl tracking-tight mb-1 text-white truncate">
            {place.name}
          </div>
          {/* Short description */}
          <div className="text-xs text-gray-400 mb-2 truncate">
            {place.short_reason}
          </div>

          {/* New: Pixabay attribution and tags */}
          {place.image && (
            <div className="text-xs text-gray-400 mb-2 flex flex-col gap-1">
              <span>
                📸 By&nbsp;
                <a
                  href={place.image.photographerProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 underline hover:text-pink-300"
                >
                  {place.image.photographer}
                </a>
              </span>
              <span>
                <span className="text-gray-500">Tags:</span> {place.image.description}
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-1 mb-2">
            {(place.primary_vibes || []).map((vibe) => (
              <span
                key={vibe}
                className="bg-gradient-to-br from-blue-800 via-violet-700 to-pink-700/90 text-blue-100 rounded-full px-2 py-0.5 text-xs font-medium border border-blue-600/30 shadow-sm"
              >
                {vibe}
              </span>
            ))}
          </div>
        </div>
        {/* Price */}
        <div className="mt-2 flex items-center gap-3 text-sm font-bold">
          <span className="text-yellow-300">
            ₹{place.est_daily_cost_per_person?.min}
            –
            {place.est_daily_cost_per_person?.max}
          </span>
          <span className="text-xs text-gray-400 font-normal">/person/day</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
