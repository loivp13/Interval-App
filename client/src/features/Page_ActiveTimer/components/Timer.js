import React, { useState, useEffect, useRef } from "react";
import UseIntervalHook from "../../../customHooks/UseInterval";
import AnimatedTimer from "../../animateTimer/AnimatedTimer";

import PauseIcon from "../../../images/BUTTON - pause.png";
import PlayIcon from "../../../images/BUTTON - PLAY.png";
import RepeatIcon from "../../../images/button-repeat.png";

export default function Timer({ timerName, currentTimer, setCurrentTimer }) {
  let [timerValues, setTimerValues] = useState(currentTimer.times);
  let [isRunning, setRunningState] = useState(false);
  let { hr, min, sec } = timerValues;

  const handleStartTimer = () => {
    startTimer();
  };

  const startTimer = () => {
    setRunningState(true);
  };

  const pauseTimer = () => {
    setRunningState(false);
  };

  //function to calc and update new times
  const countDown = () => {
    console.log(isRunning);
    let updatedSec = --sec;
    if (updatedSec < 0) {
      let updatedMin = --min;
      if (updatedMin < 0) {
        let updatedHr = --hr;
        if (updatedHr < 0) {
          setRunningState(false);
        } else {
          setTimerValues({
            ...timerValues,
            hr: updatedHr,
            sec: 59,
            min: 59,
          });
        }
      } else {
        setTimerValues({ ...timerValues, sec: 59, min: updatedMin });
      }
    } else {
      setTimerValues({ ...timerValues, sec: updatedSec });
    }
  };

  UseIntervalHook(countDown, 1000, isRunning);

  return (
    <div className="Timer font-openSans mt-6">
      <div className="text-4xl text-th-secondary uppercase text-center mb-8">
        {timerName}
      </div>
      <AnimatedTimer hr={hr} min={min} sec={sec}></AnimatedTimer>.
      <div className="flex justify-around mx-20">
        <button
          className="font-quicksand text-th-secondary"
          onClick={() => {
            handleStartTimer();
          }}
        >
          <div className="">
            <img src={PlayIcon} alt="" />
          </div>
          start timer
        </button>
        <button
          className="font-quicksand text-th-secondary"
          onClick={() => {
            pauseTimer();
          }}
        >
          <div className="">
            <img src={PauseIcon} alt="" />
          </div>
          pause timer
        </button>
      </div>
    </div>
  );
}
