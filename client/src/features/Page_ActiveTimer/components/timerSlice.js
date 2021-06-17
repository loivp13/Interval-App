import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  timerName: "Quickstart",
  timers: [
    {
      currentTimerName: "first counter",
      times: {
        hr: 0,
        min: 0,
        sec: 5,
      },
    },
    {
      currentTimerName: "second counter",
      times: {
        hr: 0,
        min: 0,
        sec: 5,
      },
    },
  ],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const saveTimerAsync = createAsyncThunk(
  "timer/saveTimer",
  console.log("hasdhfhas")
);

export const timerSlice = createSlice({
  name: "timer",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setNewTimer: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.timers = action.payload;
    },
    setTimerName: (state, action) => {
      state.timerName = action.payload;
    },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(saveTimerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(saveTimerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

export const { setNewTimer, setTimerName } = timerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTimer = (state) => state.timer;

export default timerSlice.reducer;
