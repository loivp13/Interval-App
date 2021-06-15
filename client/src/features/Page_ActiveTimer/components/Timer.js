import React, { useState, useEffect, useRef } from "react";
import UseIntervalHook from "../../../customHooks/UseInterval";

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

  const PauseTimer = () => {
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
    <div className="Timer text-openSans mt-8">
      <div className="text-3xl text-th-secondary uppercase text-center">
        {timerName}
      </div>
      <div className="">{`${hr.toString().padStart(2, 0)}:${min
        .toString()
        .padStart(2, 0)}:${sec.toString().padStart(2, 0)}`}</div>
      <button
        onClick={() => {
          handleStartTimer();
        }}
      >
        start timer
      </button>
    </div>
  );
}
