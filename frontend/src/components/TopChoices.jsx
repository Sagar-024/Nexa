import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Card from "./Card.jsx";

function TopChoices() {
  const location = useLocation();
  const navigate = useNavigate();
  const prefKey = location.state?.prefKey;

  React.useEffect(() => {
    if (!prefKey) {
      navigate("/home");
    }
  }, [prefKey, navigate]);

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

  return (
    // Top-level wrapper, gives full black background even outside content
    <div className="w-full min-h-screen bg-black">
      {/* Main content area */}
      <div className="max-w-7xl mx-auto flex flex-col gap-14 py-10 md:py-16 px-4 sm:px-8 lg:px-16">
        {/* 1. Top Trips */}
        <section>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-8 text-white tracking-tight drop-shadow-md">
            ✨ Top Choices for Your Trip
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10">
            {recommendation.top_places.map((place) => (
              <Card key={place.id} place={place} />
            ))}
          </div>
        </section>

       {/* Budget Stretch Upgrades Card */}
<section className="bg-white/5 backdrop-blur-sm border border-purple-600/20 rounded-2xl shadow-sm mx-auto mt-10 mb-10 max-w-4xl p-6 sm:p-8 flex flex-col gap-4">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-pink-400 text-xl">🌟</span>
    <h3 className="font-bold text-lg sm:text-xl text-white">Budget Stretch Upgrades</h3>
  </div>
  <div className="text-sm text-gray-300 mb-2">
    <span className="text-pink-400 font-semibold">{recommendation.budget_stretch_advisor.recommended_increase}</span>
    <span> · {recommendation.budget_stretch_advisor.why_it_matters}</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {(recommendation.budget_stretch_advisor.upgrades || []).map((upg) => (
      <div
        key={upg.title}
        className="bg-white/5 border border-pink-300/10 rounded-xl shadow-sm p-4 flex flex-col gap-1 hover:shadow-lg transition-all"
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


        {/* Budget Cut Optimizer Card */}
<section className="bg-white/5 backdrop-blur-sm border border-green-500/15 rounded-2xl shadow-sm mx-auto mt-5 max-w-4xl p-6 sm:p-8 flex flex-col gap-4">
  <div className="flex items-center gap-2 mb-2">
    <span className="text-green-400 text-xl">✂️</span>
    <h3 className="font-bold text-lg sm:text-xl text-white">Budget Cut Optimizer</h3>
  </div>
  <div className="text-sm text-gray-300 mb-2">
    <span className="text-green-400 font-semibold">{recommendation.budget_cut_optimizer.target_savings}</span>
    <span> · {recommendation.budget_cut_optimizer.principle}</span>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {(recommendation.budget_cut_optimizer.swaps || []).map((swap, i) => (
      <div
        key={swap.replace + swap.with + i}
        className="bg-white/5 border border-green-300/10 rounded-xl shadow-sm p-4 flex flex-col gap-1 hover:shadow-lg transition-all"
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



      </div>
    </div>
  );
}

export default TopChoices;
