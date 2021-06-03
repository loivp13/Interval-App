import { DEFAULT_THEME } from "../../themes";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: DEFAULT_THEME,
};
//create init state and create reducers
export const changeThemeSlice = createSlice({
  name: "changeTheme",
  initialState,
  reducers: {
    defaultTheme: (state) => {
      state.theme = "slateTeal";
    },
    seafoamGreenTheme: (state) => {
      state.theme = "seafoamGreen";
    },
    lilacTheme: (state) => {
      state.theme = "base";
    },
  },
});

//
export const selectTheme = (state) => {
  return state.changeTheme.theme;
};

export const { defaultTheme, seafoamGreenTheme, lilacTheme } =
  changeThemeSlice.actions;

export default changeThemeSlice.reducer;
