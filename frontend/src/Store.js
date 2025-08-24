
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import recommendationReducer from "./slices/recommendationSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["recommendation"], 
};

const rootReducer = combineReducers({
  recommendation: recommendationReducer,
  
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
