import React, { useRef, useEffect, useState } from "react";
import UseIntervalHook from "../../customHooks/UseInterval";

export default function AnimatedTimer({
  sec,
  min,
  hr,
  totalTime,
  currentTimerName,
  isFinished,
}) {
  //calc how many dasharray to display
  const currentDashArray = ((totalTime - (sec + 60 * min)) / totalTime) * 283;

  //animate timer ring
  let timeElapsedCircleRef = useRef();
  useEffect(() => {
    timeElapsedCircleRef.current = document.getElementById("elapsedCircle");
    timeElapsedCircleRef.current.setAttribute(
      "stroke-dasharray",
      `${currentDashArray.toFixed(0)} 283`
    );
  }, [currentDashArray, currentTimerName]);

  // animate blinking text
  const [isTextOpaque, setTextOpaque] = useState(false);
  const renderBlinkingText = () => {
    return isTextOpaque && isFinished ? "opacity-50" : "";
  };
  const blinkTimerText = () => {
    setTextOpaque(!isTextOpaque);
  };
  UseIntervalHook(blinkTimerText, 300, isFinished);

  return (
    <div className="AnimatedTime relative w-9/10vw max-w-md">
      <svg
        className="base-timer__svg"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="base-timer__circle">
          <circle
            className="base-timer__path-elapsed stroke-current text-th-white fill-th-none stroke-1 "
            cx="50"
            cy="50"
            r="45"
          />
          <path
            id="elapsedCircle"
            className="base-timer__path-elapsed transform origin-center  -rotate-90 stroke-current scale-x-neg100 duration-1000 text-th-secondary fill-th-none stroke-2 "
            d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
          />
        </g>
      </svg>
      <span className=" absolute top-0 w-full h-full text-th-white flex flex-col items-center justify-center">
        <div className=" relative title text-center text-7xl  md:text-8xl  w-full">
          <div className=" absolute -top-16 w-full title text-center text-th-secondary text-2xl mb-16 uppercase">
            {currentTimerName}
          </div>
          <div className="w-full flex justify-around px-12 items-center">
            <span
              className={`w-2/5 text-center ${renderBlinkingText()}`}
            >{`${min.toString().padStart(2, 0)}`}</span>
            <span className={`w-1/5 text-center ${renderBlinkingText()}`}>
              :
            </span>
            <span
              className={` w-2/5 text-center ${renderBlinkingText()}`}
            >{`${sec.toString().padStart(2, 0)}`}</span>
          </div>
          <div className="absolute flex justify-around w-full px-12 items-center mt-4">
            <div className="text-th-secondary text-lg font-quicksand uppercase">
              Min
            </div>
            <div className="text-th-secondary text-lg font-quicksand uppercase">
              Sec
            </div>
          </div>
        </div>
      </span>
    </div>
  );
}
