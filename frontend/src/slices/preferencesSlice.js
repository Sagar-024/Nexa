import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  days: "",
  numPeople: "",
  budget: "",
};

const preferencesSlice = createSlice({
  name: "preferences",
  initialState,
  reducers: {
    setPreferences: (state, action) => {
      state.location = action.payload.location;
      state.days = action.payload.days;
      state.numPeople = action.payload.numPeople;
      state.budget = action.payload.budget;
    },
    clearPreferences: (state) => {
      state.location = "";
      state.days = "";
      state.numPeople = "";
      state.budget = "";
    },
  },
});

export const { setPreferences, clearPreferences } = preferencesSlice.actions;
export default preferencesSlice.reducer;
