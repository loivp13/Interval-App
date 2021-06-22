import React, { useEffect, useState } from "react";
import classNames from "classnames";

export default function EditableTime() {
  let timeValuesClassNames = classNames("h-1/3", "scroll-child-start");

  //Add extra divs
  const addMoreColumns = (type, arr) => {
    //max 60min | max 59sec
    let maxNum = type === "min" ? 60 : 59;
    let randomKeyBase = Math.floor(Math.random() * 2000000);
    for (let i = 0; i <= maxNum; i++) {
      arr.push(
        <div key={i + randomKeyBase} className={timeValuesClassNames}>
          {`${i}`.padStart(2, 0)}
        </div>
      );
    }
  };
  //Generating the Seconds column
  const renderSecColumns = () => {
    let secColumns = [];
    addMoreColumns("sec", secColumns);
    addMoreColumns("sec", secColumns);
    return secColumns;
  };
  //Generate the Minutes column
  const renderMinColumns = () => {
    let minColumns = [];
    addMoreColumns("min", minColumns);
    addMoreColumns("min", minColumns);
    return minColumns;
  };
  const [secColumnState, setSecColumn] = useState(renderSecColumns());
  const [minColumnState, setMinColumn] = useState(renderMinColumns());

  //start the columns at the center and recenter when user reaches bottom or top
  useEffect(() => {
    //sec column centered
    let secColumns = document.getElementById("secondsColumn");
    let {
      clientHeight: secClientHeight,
      scrollHeight: secScrollHeight,
      scrollTop: secScrollTop,
    } = secColumns;
    let secCenter = secScrollHeight / 2;
    secColumns.scrollTo(0, secCenter);

    //min column centered
    let minColumns = document.getElementById("minColumn");
    let minColumnsHeight = minColumns.scrollHeight;
    let minCenter = minColumnsHeight / 2 - minColumns.children[0].clientHeight;
    minColumns.scrollTo(0, minCenter);

    return () => {};
  }, []);

  const checkShouldAddColumn = (e) => {
    let { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight >= scrollHeight) {
      return true;
    } else {
      return false;
    }
  };
  const eventHandlerFuncSec = (e) => {
    let shouldAddColumn = checkShouldAddColumn(e);
    if (shouldAddColumn) {
      let appendArr = [];
      addMoreColumns("sec", appendArr);
      setSecColumn([...secColumnState, ...appendArr]);
      e.target.removeEventListener("scroll", eventHandlerFuncSec);
    }
  };
  const eventHandlerFuncMin = (e) => {
    let shouldAddColumn = checkShouldAddColumn(e);
    if (shouldAddColumn) {
      let appendArr = [];
      addMoreColumns("min", appendArr);
      setMinColumn([...minColumnState, ...appendArr]);
      e.target.removeEventListener("scroll", eventHandlerFuncMin);
    }
  };

  useEffect(() => {
    //recenter sec and min when hitting bottom or top of scroll
    let secColumns = document.getElementById("secondsColumn");
    let minColumns = document.getElementById("minColumn");

    secColumns.addEventListener("scroll", eventHandlerFuncSec);
    minColumns.addEventListener("scroll", eventHandlerFuncMin);
  });
  return (
    <div className="h-1/2 ">
      <div className="flex justify-center h-full items-center">
        <div
          id="minColumn"
          className="text-th-white text-9xl w-2/5 h-full  text-center font-bold overflow-scroll scroll-mandatory-y hide-scrollbar cursor-pointer"
        >
          {minColumnState}
        </div>
        <div className="text-th-white text-8xl w-1/8 h-1/3 text-center font-bold">
          :
        </div>
        <div
          id="secondsColumn"
          className="text-th-white text-9xl w-2/5 h-full  text-center font-bold overflow-scroll scroll-mandatory-y hide-scrollbar cursor-pointer"
        >
          {secColumnState}
        </div>
      </div>
    </div>
  );
}
