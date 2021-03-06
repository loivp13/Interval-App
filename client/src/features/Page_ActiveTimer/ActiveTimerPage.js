import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Timer from "./components/Timer";
import Footer from "../footer/Footer";

import { setNewTimer, selectTimer } from "./components/timerSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ActiveTimerPage() {
  //get selected timer from redux
  let timer = useSelector(selectTimer);
  //get name and all timers from current timer
  let { timerName, timers } = timer;
  let [currentTimer, setCurrentTimer] = useState(0);

  const handleRequestNextTimer = () => {
    if (currentTimer + 1 < timers.length) {
      setCurrentTimer(currentTimer + 1);
      return true;
    }
    return false;
  };
  const handleRequestResetTimer = () => {
    setCurrentTimer(0);
  };
  return (
    <MobileLayout>
      <Navbar displayHelp={true} displayBack={true}></Navbar>
      <Timer
        handleRequestResetTimer={handleRequestResetTimer}
        handleRequestNextTimer={handleRequestNextTimer}
        timerName={timerName}
        currentTimer={timers[currentTimer]}
      ></Timer>
      <Footer></Footer>
    </MobileLayout>
  );
}
