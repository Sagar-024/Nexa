import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRecommendation } from "../slices/recommendationSlice";
import axios from "axios";

const steps = [
  "Submitting your search preferences",
  "Sending data to the smart AI",
  "Processing and ranking best trips",
  "Fetching images & place info",
  "Saving results for you",
  "Almost there—presenting your top trips"
];

export default function LoaderPage() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [recommendation, setLocalRecommendation] = React.useState(null);
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { prefKey, preferences } = location.state || {};

  React.useEffect(() => {
    if (!prefKey || !preferences) {
      navigate("/home");
      return;
    }
    let isMounted = true;
    let start = Date.now();
    let minLoaderTime = 8; 

    // Step 1
    setActiveStep(0);

    setTimeout(() => isMounted && setActiveStep(1), 200);

        setTimeout(async () => {
      isMounted && setActiveStep(2);

      try {
        
        // For backward compatibility, still get the full recommendation
        const response = await axios.post(
         "http://localhost:5000/api/v1/recommendations",
          { preferences }
        );
        console.log("API POST preferences:", preferences, "Response:", response.data, "prefKey:", prefKey);

        if (!isMounted) return;

        setLocalRecommendation(response.data);
        setActiveStep(3);

        setTimeout(() => {
          if (isMounted) {
            dispatch(
              setRecommendation({
                key: prefKey,
                data: response.data
              })
            );
            setActiveStep(4); 
          }
        }, 600);

        const elapsed = (Date.now() - start) / 1000;
        const remaining = Math.max(minLoaderTime - elapsed, 0);

        setTimeout(() => {
          if (isMounted) {
            setActiveStep(5);
            setTimeout(() => {
             
              navigate("/home/top-choices", { state: { prefKey } });
            }, 750);
          }
        }, remaining * 1000 + 400);

      } catch (err) {
        setError("Something went wrong. Please try again.");
        navigate("/home");
      }
    }, 600);

    return () => {
      isMounted = false;
    };
  }, [dispatch, prefKey, preferences, navigate]);


  if (error) {
    return (
      <div className="w-full text-center text-red-400 py-12">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black relative overflow-hidden">
      <div className="absolute right-48 top-[50%] w-72 h-56 bg-sky-400 blur-3xl opacity-30 rounded-full pointer-events-none" />
      <ol className="flex flex-col gap-4 z-10">
        {steps.map((step, i) => {
          let state =
            i < activeStep
              ? "done"
              : i === activeStep
              ? "active"
              : "next";
          return (
            <li key={i} className="flex items-center gap-3">
              <span
                className={`
                  w-6 h-6 flex items-center justify-center rounded-full text-lg font-bold
                  ${state === "done" ? "bg-white text-black" : ""}
                  ${state === "active" ? "bg-black border-2 border-lime-400 text-lime-400 animate-pulse" : ""}
                  ${state === "next" ? "bg-black border-2 border-neutral-700 text-neutral-700" : ""}
                `}
                style={{
                  minWidth: 24,
                  minHeight: 24,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                {state === "done" && <span>✓</span>}
                {state === "active" && <span>✓</span>}
                {state === "next" && <span>✓</span>}
              </span>
              <span
                className={`
                  text-lg font-medium
                  ${state === "active" ? "text-lime-400" : ""}
                  ${state === "done" ? "text-white" : ""}
                  ${state === "next" ? "text-neutral-500" : ""}
                `}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ol>
      <div className="mt-10 animate-spin">
        <svg className="h-7 w-7 text-blue-400" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-70" fill="currentColor" d="M4 12a8 8 0 018-8" />
        </svg>
      </div>
     
    </div>
  );
}