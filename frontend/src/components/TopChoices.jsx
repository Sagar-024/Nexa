import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card.jsx";

function TopChoices() {
  const locationRouter = useLocation();
  const navigate = useNavigate();

  const preferences = useSelector(state => state.preferences);
  const prefKey = locationRouter.state?.prefKey || JSON.stringify(preferences);

  React.useEffect(() => {
    if (!preferences.location) {
      navigate("/home");
    }
  }, [preferences, navigate]);

  const recommendation = useSelector(
    (state) => prefKey && state.recommendation.recommendations[prefKey]
  );

  if (!recommendation) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center text-gray-300 bg-black py-16 px-6">
        <p className="text-lg md:text-xl">No recommendations found.</p>
        <button
          onClick={() => navigate("/home")}
          className="mt-6 px-5 py-3 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 text-white font-medium rounded-xl shadow-lg hover:scale-105 transition"
        >
          Go Back to Search
        </button>
      </div>
    );
  }

  const userLocation = preferences.location || "Your Destination";
  function capitalize(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="w-full min-h-screen bg-black">
      <div className="flex flex-col items-center gap-10 pt-8 pb-16 px-2 sm:px-4">
        <section className="w-full">
          <h2
            className="font-extrabold bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent sm:text-3xl md:text-4xl tracking-tight drop-shadow-md mb-2 text-center"
            style={{
              fontFamily: "'Stardos Stencil', 'Inter', sans-serif",
              fontWeight: 700
            }}
          >
            <span className="text-3xl text-white">In</span> {capitalize(userLocation)}
          </h2>
          <h2
            className="text-3xl font-extrabold bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent sm:text-3xl md:text-4xl mb-8 tracking-tight drop-shadow-md text-center"
            style={{
              fontFamily: "'Stardos Stencil', 'Inter', sans-serif",
              fontWeight: 700
            }}
          >
            <span className="text-3xl text-white"> Top Choices for </span> Your Trip
          </h2>

          <div className="w-full flex flex-col items-center gap-10">
            {recommendation.top_places.map((place) => (
              <Card key={place.id} place={place} />
            ))}
          </div>
        </section>

        {/* Budget Stretch Upgrades Card */}
        {recommendation.budget_stretch_advisor && (
          <section className="bg-white/5 backdrop-blur-md border border-purple-600/20 rounded-2xl shadow-lg mx-auto mt-10 max-w-[420px] w-full p-5 flex flex-col gap-4 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-pink-400 text-xl">🌟</span>
              <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow">Budget Stretch Upgrades</h3>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              <span className="text-pink-400 font-semibold">
                {recommendation.budget_stretch_advisor.recommended_increase}
              </span>
              <span> &middot; {recommendation.budget_stretch_advisor.why_it_matters}</span>
            </div>
            <div className="flex flex-col gap-4">
              {(recommendation.budget_stretch_advisor.upgrades || []).map((upg) => (
                <div
                  key={upg.title}
                  className="bg-[#222230]/70 border border-pink-300/20 rounded-xl shadow-sm p-4 flex flex-col gap-1 hover:shadow-lg transition-all"
                >
                  <div className="font-semibold text-pink-200 text-base flex items-center">
                    ✚ {upg.title}
                  </div>
                  <div className="text-yellow-400 font-medium">{upg.extra_cost_per_person}</div>
                  <div className="text-xs text-gray-400">{upg.what_you_get}</div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Budget Cut Optimizer Card */}
        {recommendation.budget_cut_optimizer && (
          <section className="bg-white/5 backdrop-blur-md border border-green-500/15 rounded-2xl shadow-lg mx-auto mt-5 max-w-[420px] w-full p-5 flex flex-col gap-4 transition-all">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400 text-xl">✂️</span>
              <h3 className="font-bold text-lg sm:text-xl text-white drop-shadow">Budget Cut Optimizer</h3>
            </div>
            <div className="text-sm text-gray-300 mb-2">
              <span className="text-green-400 font-semibold">
                {recommendation.budget_cut_optimizer.target_savings}
              </span>
              <span> &middot; {recommendation.budget_cut_optimizer.principle}</span>
            </div>
            <div className="flex flex-col gap-4">
              {(recommendation.budget_cut_optimizer.swaps || []).map((swap, i) => (
                <div
                  key={swap.replace + swap.with + i}
                  className="bg-[#1a2a1e]/80 border border-green-300/20 rounded-xl shadow-sm p-4 flex flex-col gap-1 hover:shadow-lg transition-all"
                >
                  <div className="text-xs">
                    <span className="line-through text-red-300 mr-2">{swap.replace}</span>
                    <span className="text-green-300 mx-1">→ {swap.with}</span>
                    <span className="text-yellow-300">{swap.savings_per_person}</span>
                  </div>
                  <div className="text-xs text-gray-400">{swap.impact_on_experience}</div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default TopChoices;
