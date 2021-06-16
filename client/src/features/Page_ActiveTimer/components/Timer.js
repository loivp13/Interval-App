import React, { useState, useEffect, useRef } from "react";
import UseIntervalHook from "../../../customHooks/UseInterval";
import AnimatedTimer from "../../animateTimer/AnimatedTimer";
import TimerButton from "./TimerButton";

import PauseIcon from "../../../images/BUTTON - pause.png";
import PlayIcon from "../../../images/BUTTON - PLAY.png";
import RepeatIcon from "../../../images/button-repeat.png";

export default function Timer({ timerName, currentTimer, setCurrentTimer }) {
  let [timerValues, setTimerValues] = useState(currentTimer.times);
  let [isRunning, setRunningState] = useState(false);
  let { hr, min, sec } = timerValues;
  let [totalTime, setTotalTime] = useState(min * 60 + sec);

  const handleStartTimer = () => {
    startTimer();
  };

  const startTimer = () => {
    setRunningState(true);
  };

  const pauseTimer = () => {
    setRunningState(false);
  };
  const resetTimer = () => {
    setRunningState(false);
    setTimerValues(currentTimer.times);
  };
  const updateTimer = (hr, min, sec) => {
    setTimerValues({
      ...timerValues,
      hr,
      sec,
      min,
    });
  };
  //function to calc and update new times
  const countDown = () => {
    let updatedSec = --sec;
    if (updatedSec < 0) {
      let updatedMin = --min;
      if (updatedMin < 0) {
        let updatedHr = --hr;
        if (updatedHr < 0) {
          setRunningState(false);
        } else {
          updateTimer(updatedHr, 59, 59);
        }
      } else {
        updateTimer(hr, updatedMin, 59);
      }
    } else {
      updateTimer(hr, min, updatedSec);
    }
  };

  UseIntervalHook(countDown, 1000, isRunning);

  return (
    <div className="Timer font-openSans mt-6">
      <div className="text-4xl text-th-secondary uppercase text-center mb-8">
        {timerName}
      </div>
      <AnimatedTimer
        totalTime={totalTime}
        hr={hr}
        min={min}
        sec={sec}
      ></AnimatedTimer>

      <div className="flex justify-around mx-20">
        {!isRunning && (
          <TimerButton
            action={handleStartTimer}
            text="start"
            icon={PlayIcon}
          ></TimerButton>
        )}

        {isRunning && (
          <TimerButton
            action={pauseTimer}
            text="pause"
            icon={PauseIcon}
          ></TimerButton>
        )}
        <TimerButton
          action={resetTimer}
          text="reset"
          icon={RepeatIcon}
        ></TimerButton>
      </div>
    </div>
  );
}
