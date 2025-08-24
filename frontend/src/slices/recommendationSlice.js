
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  recommendations: {}  
};

const recommendationSlice = createSlice({
  name: "recommendation",
  initialState,
  reducers: {
    setRecommendation: (state, action) => {

      const { key, data } = action.payload;
      state.recommendations[key] = data;
      
    }
  }
});


export const { setRecommendation } = recommendationSlice.actions;

export default recommendationSlice.reducer;
