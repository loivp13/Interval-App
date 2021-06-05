import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSoundOn: false,
};
//create init state and create reducers
export const SlideSwitchSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    flipSoundSwitch: (state) => {
      state.isSoundOn = !state.isSoundOn;
    },
  },
});

//use for getting state
export const selectSoundSetting = (state) => {
  return state.settings.isSoundOn;
};

export const { flipSoundSwitch } = SlideSwitchSlice.actions;

export default SlideSwitchSlice.reducer;
