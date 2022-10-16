import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  timer: 0,
  isRunning: false,
  correct: {},
  incorrect: {},
};

const inputStatusSlice = createSlice({
  name: "inputStatus",
  initialState,
  reducers: {
    setTimerRedux(state, action) {
      state.timer = action.payload;
    },
    setIsRunningRedux(state, action) {
      state.isRunning = action.payload;
    },
    setCorrectRedux(state, action) {
      state.correct = action.payload;
    },
    setIncorrectRedux(state, action) {
      state.incorrect = action.payload;
    },
  },
});

export const {
  setTimerRedux,
  setIsRunningRedux,
  setCorrectRedux,
  setIncorrectRedux,
} = inputStatusSlice.actions;
export default inputStatusSlice.reducer;
