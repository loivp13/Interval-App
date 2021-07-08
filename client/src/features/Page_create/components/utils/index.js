import { current } from "@reduxjs/toolkit";

//Check if columns should center
export const checkShouldRecenterColumn = (
  clientHeight,
  scrollTop,
  scrollHeight
) => {
  if (scrollHeight - (scrollTop + clientHeight) < 5) {
    return { type: "centerOffset1", shouldRecenterColumn: true };
  } else if (scrollTop === 0) {
    return { type: "center", shouldRecenterColumn: true };
  } else {
    return { type: "", shouldRecenterColumn: false };
  }
};

//create scrollListeners
export const createEventScrollListener = (
  timeUnit,
  calcSecChange,
  calcMinChange,
  scrollTopSecRef,
  scrollTopMinRef
) => {
  return function (e) {
    let { clientHeight, scrollTop, scrollHeight, children } = e.target;

    let childBoxHeight = clientHeight / 3;
    let centerIndex =
      timeUnit === "sec" ? children.length / 2 + 1 : children.length / 2;

    if (timeUnit === "sec") {
      calcSecChange(scrollTop, childBoxHeight, children, centerIndex);
    } else {
      calcMinChange(scrollTop, childBoxHeight, children, centerIndex);
    }
    let { type, shouldRecenterColumn } = checkShouldRecenterColumn(
      clientHeight,
      scrollTop,
      scrollHeight,
      children
    );

    if (shouldRecenterColumn) {
      type === "centerOffset1"
        ? (e.target.scrollTop =
            scrollTopSecRef.current - (2 * clientHeight) / 3)
        : (e.target.scrollTop = scrollTopMinRef.current + clientHeight / 3);
    }
  };
};

//change Input permission
export function changeInputEditPermission(
  children,
  enableIndex,
  disableIndexes
) {
  children[enableIndex].children[0].classList.remove("pointer-events-none");
  for (let index of disableIndexes) {
    children[index].children[0].classList.add("pointer-events-none");
  }
}

// changes color text removing before and after
export const changeColorText = (
  children,
  addColorIndex,
  removeColorIndexes
) => {
  children[addColorIndex].children[0].classList.remove("placeholder-gray-300");

  children[addColorIndex].children[0].classList.add("placeholder-white");

  removeColorIndexes.forEach((index) => {
    if (children[index]) {
      children[index].children[0].classList.remove("placeholder-white");
      children[index].children[0].classList.add("placeholder-gray-300");
    }
  });
};

//limit characters to two
//update after check
export function limitChar2(e, handleTimeInputChange) {
  e.preventDefault();
  let isMaxCharacter = e.target.value.length + 1 > 2;
  let currentValue = +(e.target.value + e.key);
  if (currentValue > 60) {
    e.target.value = e.key;
    handleTimeInputChange(e);
    return;
  } else {
    e.target.value = e.target.value + e.key;
    handleTimeInputChange(e);
  }
  if (isMaxCharacter && !isNaN(e.key)) {
    e.target.value = e.target.value.substring(1, 3);
    handleTimeInputChange(e);
  }
}

//generate timer data sets
export function generateTimers(works, breaks, sets, type) {
  //set order in which the timer will be displayed, order count determined by length of server timers or local timers depending on if isSignIn
  let currentOrder;
  let isSignIn = !!localStorage.getItem("user");
  let serverTimers = JSON.parse(localStorage.getItem("serverTimers")) || [];
  let localTimers = JSON.parse(localStorage.getItem("localTimers")) || [];

  currentOrder = isSignIn ? serverTimers : localTimers.length;
  //if user gave no name to timer, increment unnamed timer in storage
  let numOfUnnamedTimer;
  if (type === "save") {
    numOfUnnamedTimer =
      JSON.parse(localStorage.getItem("numUnnamedTimer")) || 0;
    localStorage.setItem("numUnnamedTimer", ++numOfUnnamedTimer);
  } else {
    numOfUnnamedTimer = "";
  }
  let newTimer = {
    timerName: `Timer ${numOfUnnamedTimer}`,
    timers: [],
    totalSets: 0,
    order: currentOrder,
  };

  //insert work then break alternatively by the numbers of sets times;
  let workIndex = 0;
  let breakIndex = 0;
  let setIndex = 1;
  while (setIndex <= (sets || 1)) {
    let setTimer = {
      currentTimerName: ``,
      times: {
        hr: 0,
        min: 0,
        sec: 0,
      },
    };
    //if no breaks add only sets
    if (breaks.min + breaks.sec === 0) {
      setTimer.currentTimerName = `Set ${setIndex}`;
      setTimer.times.min = works.min;
      setTimer.times.sec = works.sec;
      setIndex++;
      newTimer.totalSets++;
      //alternate between work and break
    } else if (workIndex <= breakIndex) {
      setTimer.currentTimerName = `Set ${setIndex}`;
      setTimer.times.min = works.min;
      setTimer.times.sec = works.sec;
      workIndex++;
    } else {
      setTimer.currentTimerName = `Break ${setIndex}`;
      setTimer.times.min = breaks.min;
      setTimer.times.sec = breaks.sec;
      breakIndex++;
      newTimer.totalSets++;
      setIndex++;
    }
    newTimer.timers.push(setTimer);
  }
  return newTimer;
}
