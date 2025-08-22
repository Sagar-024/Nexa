import { useState } from "react";
import { FaSearch, FaSlidersH, FaMountain, FaCampground, FaUmbrellaBeach, FaTree } from "react-icons/fa";
import Navbar from "./Navbar.jsx";
import HoverBorderGradient from "./HoverBorderGradient.jsx";
import Vortex from './Vortex.jsx'



const cityCards = [
    {
        img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        name: "Mar caribe, avenida lago",
        place: "Thailand",
        rating: 4.9,
    },
    {
        img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=80",
        name: "Passo Rolle, TN",
        place: "Italia",
        rating: 4.7,
    },
    {
        img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80",
        name: "Bondi Beach",
        place: "Australia",
        rating: 4.8,
    },
];

const categories = [
    { icon: <FaMountain />, label: "Mountains" },
    { icon: <FaCampground />, label: "Camp" },
    { icon: <FaUmbrellaBeach />, label: "Beach" },
    { icon: <FaTree />, label: "Parks" },
];

export default function Home() {
    const [categoryActive, setCategoryActive] = useState(1);

    return (
        <div className="relative min-h-screen bg-black text-white flex flex-col w-full">
            <Vortex
                backgroundColor="black"
                rangeY={1000}
                particleCount={24}
                baseRadius={2.5}           // Big, round dots
                rangeRadius={1.2}          // Some size variety, but not huge
                baseSpeed={0.005}          // Barely move at all—stars look nearly static
                rangeSpeed={0.002}
                className="w-full h-full"
            >



                <Navbar />

                <main className="flex-1 w-full flex flex-col items-center pt-16 pb-16 px-5 sm:px-10 md:px-20">
                    {/* Greeting/title */}
                    <div className="w-full max-w-2xl mb-4 mt-2 mx-auto">
                        <div className="text-gray-300 mb-1 font-medium">Hi <b>Williamson</b>,</div>
                        <h1 className="text-2xl md:text-3xl font-bold mb-3">Where do you want to go?</h1>
                    </div>

                     
                    {/* City search bar */}
                    <div className="w-full max-w-2xl mb-6 flex items-center gap-2 bg-[#18181b] rounded-xl px-4 mx-auto  border-1">
                        <FaSearch className="text-gray-400 text-xl mr-2" />
                        <input
                            className="flex-1 p-4 bg-transparent border-none text-white placeholder:text-gray-500 focus:ring-0 outline-none"
                            placeholder="Discover a city"
                        />
                        <button className="ml-2 p-2 bg-[#23232a] rounded-full text-gray-300 hover:text-white">
                            <FaSlidersH />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="w-full max-w-2xl mb-2 flex gap-5 text-gray-400 font-semibold text-sm mx-auto my-10">
                        <span className="text-white border-b-2 border-white pb-1 cursor-pointer">Popular</span>
                        <span className="hover:text-white cursor-pointer">Recommended</span>
                        <span className="hover:text-white cursor-pointer">Most Viewed</span>
                    </div>

                    {/* City cards */}
                    <div className="
          w-full max-w-2xl mb-8 pb-2
          flex gap-4 overflow-x-auto hide-scrollbar
          sm:grid sm:grid-cols-2 md:grid-cols-3 sm:overflow-x-visible
          mx-auto
        ">
                        {cityCards.map((c, i) => (
                            <div
                                key={i}
                                className="rounded-2xl overflow-hidden shadow-xl bg-[#151517] w-[80vw] sm:w-auto min-w-[170px] flex-shrink-0 sm:flex-shrink md:min-w-0"
                            >
                                <img src={c.img} className="w-full h-28 object-cover" alt={c.name} />
                                <div className="p-3">
                                    <div className="font-semibold">{c.name}</div>
                                    <div className="text-xs text-gray-400">{c.place}</div>
                                    <div className="flex items-center gap-1 text-sm text-yellow-400 mt-1">
                                        <span>★</span>
                                        <span>{c.rating}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Categories */}
                    <div className="w-full max-w-2xl flex gap-1 flex-wrap items-center mb-3 mx-auto">
                        <div className="text-lg font-semibold mr-4">Categories</div>
                        {categories.map((cat, idx) => (
                            <button
                                key={cat.label}
                                onClick={() => setCategoryActive(idx)}
                                className={`flex items-center gap-1 px-4 py-2 rounded-full border
                ${categoryActive === idx
                                        ? "bg-gradient-to-r from-blue-400 to-pink-400 text-white border-transparent"
                                        : "border-gray-700 text-gray-300"}
                mr-3 mb-2 transition-all font-semibold`}
                            >
                                {cat.icon}
                                {cat.label}
                            </button>
                        ))}
                        <span className="ml-2 text-blue-400 cursor-pointer hover:underline text-sm">See all &gt;</span>
                    </div>
                </main>
                {/* Hide scrollbars on horizontal scroll */}
                <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
            </Vortex>
        </div>
    );
}
