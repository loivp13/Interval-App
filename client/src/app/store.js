import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import changeThemeReducer from "../features/changeThemeButton/changeThemeSlice";
import settingReducer from "../features/Page_Setting/components/SlideSwitchSlice";
import timerReducer from "../features/Page_ActiveTimer/components/timerSlice";
import userReducer from "../appReduxSlices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    changeTheme: changeThemeReducer,
    settings: settingReducer,
    timer: timerReducer,
    user: userReducer,
  },
});
