import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import changeThemeReducer from "../features/changeThemeButton/changeThemeSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    changeTheme: changeThemeReducer,
  },
});
