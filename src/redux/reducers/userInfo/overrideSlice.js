import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  interest_scores: null,
  aptitude_scores: null,
  personality_scores: null,
  career_recommendations: null,
};

const overrideSlice = createSlice({
  name: 'override',
  initialState,
  reducers: {
    setInterestScores: (state, action) => {
      state.interest_scores = action.payload;
    },
    setAptitudeScores: (state, action) => {
      state.aptitude_scores = action.payload;
    },
    setPersonalityScores: (state, action) => {
      state.personality_scores = action.payload;
    },
    setCareerRecommendations: (state, action) => {
      state.career_recommendations = action.payload;
    },
    clearOverrides: (state) => {
      state.interest_scores = null;
      state.aptitude_scores = null;
      state.personality_scores = null;
      state.career_recommendations = null;
    },
  },
});

export const {
  setInterestScores,
  setAptitudeScores,
  setPersonalityScores,
  setCareerRecommendations,
  clearOverrides,
} = overrideSlice.actions;

export default overrideSlice.reducer;
