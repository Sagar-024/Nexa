import { configureStore } from "@reduxjs/toolkit";
import preferencesReducer from "./slices/preferencesSlice.js";
import recommendationReducer from "./slices/recommendationSlice.js"; 
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Persist config for both slices, but you may want separate configs for each
const preferencesPersistConfig = {
  key: "preferences",
  storage,
};
const recommendationPersistConfig = {
  key: "recommendation",
  storage,
};

const persistedPreferencesReducer = persistReducer(preferencesPersistConfig, preferencesReducer);
const persistedRecommendationReducer = persistReducer(recommendationPersistConfig, recommendationReducer);

export const store = configureStore({
  reducer: {
    preferences: persistedPreferencesReducer,
    recommendation: persistedRecommendationReducer, // <-- now in store
  },
});

export const persistor = persistStore(store);
