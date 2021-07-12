import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { apiAxios } from "../../../helpers/axios_api";
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
export const saveTimerAsync = createAsyncThunk("timer/saveTimer");

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

      return action.payload;
    },
    setTimerName: (state, action) => {
      state.timerName = action.payload;
    },
    updateTimer: (state, action) => {
      let isSignIn = JSON.parse(localStorage.getItem("user"));
      console.log(action);
      let timerData = action.payload;
      if (isSignIn) {
        apiAxios.put("/timer", { hi: "hi" });
      } else {
        let allLocalTimers = JSON.parse(localStorage.getItem("localTimers"));
        let id = timerData.uuid;
        for (let i = 0; i < allLocalTimers.length; i++) {
          if (allLocalTimers[i].uuid === id) {
            allLocalTimers[i] = timerData;
            localStorage.setItem("localTimers", JSON.stringify(allLocalTimers));
            break;
          }
        }
      }
    },
    saveNewTimer: (state, action) => {
      let isSignIn = JSON.parse(localStorage.getItem("user"));
      //save to server and add to localStorage timer
      if (isSignIn) {
        let serverTimer =
          JSON.parse(localStorage.getItem("serverTimers")) || [];
        action.payload.uuid = uuidv4();
        serverTimer.push(action.payload);
        localStorage.setItem("serverTimers", JSON.stringify(serverTimer));
      } else {
        let localTimers = JSON.parse(localStorage.getItem("localTimers")) || [];
        action.payload.uuid = uuidv4();
        localTimers.push(action.payload);
        localStorage.setItem("localTimers", JSON.stringify(localTimers));
      }
      return action.payload;
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

export const { setNewTimer, setTimerName, saveNewTimer, updateTimer } =
  timerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTimer = (state) => state.timer;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const asyncSetNewTimer = (payload) => async (dispatch, getState) => {
  await dispatch(setNewTimer(payload.timerData));
  payload.history.push("/activeTimer");
};

export const asyncUpdateTimer = (payload) => async (dispatch, getState) => {
  let { timerData } = payload;
  await dispatch(updateTimer(timerData));
};

export const asyncSaveNewTimer = (payload) => async (dispatch, getState) => {
  let isUserSignIn = JSON.parse(localStorage.getItem("user"));

  await saveNewTimer(payload.timerData);
  if (isUserSignIn) {
    let data = await apiAxios.put("/timer", {
      token: JSON.parse(localStorage.get("token")),
      timers: JSON.parse(localStorage.getItem("serverTimer")),
    });
  } else {
    await dispatch(setNewTimer(payload.timerData));
  }
  payload.history.push("/editTimer");
};

export default timerSlice.reducer;
