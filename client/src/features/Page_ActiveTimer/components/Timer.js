import React, { useState } from "react";

export default function Timer({ timerName, currentTimer, setCurrentTimer }) {
  let [timerValues, setTimerValues] = useState(currentTimer.times);
  let { hr, min, sec } = timerValues;
  let [intervalIds, setIntervalIds] = useState([]);

  const handleStartTimer = () => {
    startTimer();
  };
  const startTimer = () => {
    let i = setInterval(updateTimerLoop, 100);
    console.log("🚀 ~ file: Timer.js ~ line 13 ~ startTimer ~ i", i);
    setIntervalIds([...intervalIds, i]);
  };

  const clearIntervalIds = () => {
    console.log(intervalIds);
    for (let id of intervalIds) {
      console.log(id);
      clearInterval(id);
    }
    console.log("clear");
    setIntervalIds([]);
  };
  const updateTimerLoop = () => {
    let updateSec = --sec;
    if (updateSec < 0) {
      let updateMin = --min;
      if (updateMin < 0) {
        clearIntervalIds();
      } else {
        setTimerValues({ ...timerValues, min: updateMin, sec: 59 });
      }
    } else {
      setTimerValues({ ...timerValues, sec: updateSec });
    }
  };
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
