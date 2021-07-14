import { DEFAULT_THEME } from "../../themes";
import { createSlice } from "@reduxjs/toolkit";

const currentTheme = localStorage.getItem("currentTheme");
if (!currentTheme) {
  localStorage.setItem("currentTheme", DEFAULT_THEME);
}

const initialState = {
  theme: currentTheme ? currentTheme : DEFAULT_THEME,
};
//create init state and create reducers
export const changeThemeSlice = createSlice({
  name: "changeTheme",
  initialState,
  reducers: {
    defaultTheme: (state) => {
      state.theme = "slateTeal";
      localStorage.setItem("currentTheme", "slateTeal");
    },
    seafoamGreenTheme: (state) => {
      state.theme = "seafoamGreen";
      localStorage.setItem("currentTheme", "seafoamGreen");
    },
    lilacTheme: (state) => {
      state.theme = "base";
      localStorage.setItem("currentTheme", "base");
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
