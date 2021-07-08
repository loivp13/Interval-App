import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSignIn: !!JSON.parse(localStorage.getItem("user")),
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    userSignIn: (state) => {
      state.isSignIn = true;
    },
    userSignOut: (state) => {
      state.isSignIn = false;
    },
  },
});

export const { userSignIn, userSignOut } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserSignIn = (state) => state.user.isSignIn;

export const asyncUserSignIn = (payload) => async (dispatch, getState) => {
  localStorage.setItem("user", JSON.stringify(payload.data.user));
  localStorage.setItem("token", payload.data.token);
  localStorage.setItem("serverTimers", JSON.stringify([]));
  await dispatch(userSignIn());
  payload.history.push("/");
};
export const asyncUserSignOut = (payload) => async (dispatch, getState) => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  await dispatch(userSignOut());
  payload.history.push("/");
};

export default userSlice.reducer;
