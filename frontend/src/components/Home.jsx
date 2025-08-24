import { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setPreferences, clearPreferences } from "../slices/preferencesSlice.js";

// Options arrays
const dayOptions = ["One Day", "Two Days", "Three Days", "Week", "Many Weeks", "One Month"];
const peopleOptions = [
  "Solo", "Couple", "Small Group (3-5)", "Medium Group (6-10)", "Large Group (10+)"
];
const priceOptions = [
  { label: "1k+", value: 1000 },
  { label: "5k+", value: 5000 },
  { label: "10k+", value: 10000 },
  { label: "20k+", value: 20000 },
  { label: "50k+", value: 50000 },
  { label: "100k+", value: 100000 },
  { label: "Luxury", value: "luxury" }
];

export default function Home() {
  const [pref, setPref] = useState({
    destination: "",
    days: "",
    people: "",
    price: ""
  });
  const [open, setOpen] = useState({ days: false, people: false, price: false });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSearch = async () => {
    setLoading(true);

    // 1. Clear old prefs, prevent caching issues!
    dispatch(clearPreferences());

    // 2. Build new preferences object
    const preferences = {
      location: pref.destination,
      days: pref.days,
      numPeople: pref.people,
      budget: pref.price
    };

    // 3. Save to Redux (persistent)
    dispatch(setPreferences(preferences));

    // 4. Also pass via router to loader (if needed downstream)
    const prefKey = JSON.stringify(preferences);
    navigate("/loader", { state: { prefKey, preferences } });
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col w-full px-4">
      <main className="flex-1 w-full flex flex-col items-center pt-16 pb-16 px-3 md:px-20">
        <div className="w-full max-w-2xl mb-10 font-chillax mx-auto">
          <h1
            className="text-5xl font-bold mb-2 text-white"
            style={{
              fontFamily: "'Stardos Stencil', 'Inter', sans-serif",
              fontWeight: 700
            }}
          >
            Plan your{" "}
            <span className="text-5xl font-extrabold bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              dream trip
            </span>
          </h1>
          <div className="text-sm text-gray-400 mb-3">
            Enter destination, days, people, and budget to get custom recommendations.
          </div>

          {/* Search Bar */}
          <div className="w-full mt-14 sm:mt-10 px-1 border-white">
            <form
              onSubmit={e => { e.preventDefault(); handleSearch(); }}
              className="w-full flex flex-col sm:flex-row items-stretch gap-2 bg-[#18181b] border border-[#23232a] rounded-2xl shadow-lg px-3 sm:py-2 mb-8"
            >
              <input
                className="
                  bg-transparent text-white placeholder-gray-500 p-3 rounded-xl outline-none text-base flex-1 min-w-[150px] border border-transparent
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-600
                  hover:border-blue-500 transition cursor-text
                "
                placeholder="Destination (city, region, country...)"
                value={pref.destination}
                onChange={e => setPref(v => ({ ...v, destination: e.target.value }))}
              />
              {/* Dropdowns */}
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                {/* Days Dropdown */}
                <div className="relative flex-1">
                  <button
                    className="w-full bg-[#23232a] py-2 px-4 text-left rounded-xl text-gray-300 flex items-center justify-between border border-[#e5e5e5] focus:border-blue-500 transition cursor-pointer hover:border-blue-400 active:scale-95"
                    onClick={() => setOpen(o => ({ ...o, days: !o.days }))}
                    type="button"
                  >
                    {pref.days || "Days"}
                    <FaChevronDown className="ml-2 text-xs" />
                  </button>
                  {open.days && (
                    <div className="absolute left-0 right-0 mt-1 bg-[#19191c] border border-[#23232a] rounded-xl shadow-lg z-20 animate-fade-in">
                      {dayOptions.map(opt => (
                        <div
                          key={opt}
                          onClick={() => { setPref(p => ({ ...p, days: opt })); setOpen(o => ({ ...o, days: false })); }}
                          className="px-4 py-2 hover:bg-[#23232a] cursor-pointer text-white transition"
                          tabIndex={0}
                        >{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
                {/* People Dropdown */}
                <div className="relative flex-1">
                  <button
                    className="w-full bg-[#23232a] py-2 px-4 text-left rounded-xl text-gray-300 flex items-center justify-between border border-[#e5e5e5] focus:border-blue-500 transition cursor-pointer hover:border-blue-400 active:scale-95"
                    onClick={() => setOpen(o => ({ ...o, people: !o.people }))}
                    type="button"
                  >
                    {pref.people || "People"}
                    <FaChevronDown className="ml-2 text-xs" />
                  </button>
                  {open.people && (
                    <div className="absolute left-0 right-0 mt-1 bg-[#19191c] border border-[#23232a] rounded-xl shadow-lg z-20 animate-fade-in">
                      {peopleOptions.map(opt => (
                        <div
                          key={opt}
                          onClick={() => { setPref(p => ({ ...p, people: opt })); setOpen(o => ({ ...o, people: false })); }}
                          className="px-4 py-2 hover:bg-[#23232a] cursor-pointer text-white transition"
                          tabIndex={0}
                        >{opt}</div>
                      ))}
                    </div>
                  )}
                </div>
                {/* Price Dropdown */}
                <div className="relative flex-1">
                  <button
                    className="w-full bg-[#23232a] py-2 px-4 text-left rounded-xl text-gray-300 flex items-center justify-between border border-[#e5e5e5] focus:border-blue-500 transition cursor-pointer hover:border-blue-400 active:scale-95"
                    onClick={() => setOpen(o => ({ ...o, price: !o.price }))}
                    type="button"
                  >
                    {pref.price
                      ? (typeof pref.price === 'string' ? pref.price : `₹${pref.price / 1000}k+`)
                      : "Budget"}
                    <FaChevronDown className="ml-2 text-xs" />
                  </button>
                  {open.price && (
                    <div className="absolute left-0 right-0 mt-1 bg-[#19191c] border border-[#23232a] rounded-xl shadow-lg z-20 animate-fade-in">
                      {priceOptions.map(opt => (
                        <div
                          key={opt.value}
                          onClick={() => { setPref(p => ({ ...p, price: opt.value })); setOpen(o => ({ ...o, price: false })); }}
                          className="px-4 py-2 hover:bg-[#23232a] cursor-pointer text-white transition"
                          tabIndex={0}
                        >{opt.label}</div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`
                    flex items-center justify-center ml-0 sm:ml-2 rounded-full
                    bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500
                    hover:bg-white hover:text-black shadow-xl w-12 h-12 text-white text-xl transition
                    cursor-pointer hover:scale-110 active:scale-95
                    ${loading ? 'pointer-events-none opacity-70' : ''}
                  `}
                  style={{ transition: "all 0.15s cubic-bezier(0.48,1,0.67,0.98)" }}
                >
                  <FaSearch />
                </button>
              </div>
            </form>
            <style>{`
                @media (max-width: 640px) {
                  form > div.flex { flex-direction: column; }
                  form button.w-12 { margin-left: 0 !important; margin-top: 0.5rem !important; width: 100% !important; }
                }
                .animate-fade-in { animation: fadeIn 0.15s cubic-bezier(0.22,1,0.36,1) both; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px);} to { opacity: 1; transform: none; } }
              `}</style>
          </div>
        </div>
      </main>
    </div>
  );
}
