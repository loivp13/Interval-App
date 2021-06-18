import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../footer/Footer";
import CtaButtons from "./components/CtaButtons";
import Navbar from "../../features/globalComponents/navbar/Navbar";

export default function LandingPage({}) {
  return (
    <div className="LandingPage bg-th-primary h-screen flex flex-col justify-between items-center text-th-white font-quicksand">
      <Navbar displayMenu={true} displayHelp={true}></Navbar>
      <main className="Landing-main h-9/10 w-9/10 max-w-md flex flex-col justify-center items-center pt-8">
        <div className="SetIntervalCircle h-17/20vw w-17/20vw max-w-md max-h-md flex justify-center items-center rounded-full border-2 border-th-white mb-12 ">
          <h1 className="text-5xl p-9 text-center uppercase leading-tight tracking-widest">
            <Link to="/createTimer">Set Interval Timer</Link>
          </h1>
        </div>
        <div className="text-3xl font-openSans text-th-secondary mb-8 tracking-widest">
          quickstart
        </div>
        <div className="QuickStartButtons h-auto w-8/10 text-center flex flex-row flex-wrap px-4 justify-between items-center ">
          <CtaButtons
            timerData={{
              timerName: "Quickstart",
              timers: [
                {
                  currentTimerName: "00:45",
                  times: { hr: 0, min: 0, sec: 45 },
                },
              ],
            }}
            text={"00:45"}
          ></CtaButtons>
          <CtaButtons
            timerData={{
              timerName: "Quickstart",
              timers: [
                {
                  currentTimerName: "1:00",
                  times: { hr: 0, min: 1, sec: 0 },
                },
              ],
            }}
            text={"01:00"}
          ></CtaButtons>
          <CtaButtons
            timerData={{
              timerName: "Quickstart",
              timers: [
                {
                  currentTimerName: "5:00",
                  times: { hr: 0, min: 5, sec: 0 },
                },
              ],
            }}
            text={"05:00"}
          ></CtaButtons>
          <CtaButtons
            timerData={{
              timerName: "Quickstart",
              timers: [
                {
                  currentTimerName: "10:00",
                  times: { hr: 0, min: 10, sec: 0 },
                },
              ],
            }}
            text={"10:00"}
          ></CtaButtons>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}
