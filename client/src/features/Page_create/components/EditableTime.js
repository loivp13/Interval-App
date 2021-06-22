import React, { useEffect, useState, useRef } from "react";
import classNames from "classnames";
import { selectTimer } from "../../Page_ActiveTimer/components/timerSlice";
import debounce from "lodash/debounce";

export default function EditableTime() {
  let timeValuesClassNames = classNames("h-1/3", "scroll-child-start");
  let [selectedTime, setSelectedTime] = useState({ min: 0, sec: 1 });
  let [scrollTopValue, setScrollTopValue] = useState({
    scrollTopMin: 0,
    scrollTopSec: 0,
  });

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

  const checkShouldAddColumn = (e) => {
    let { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollTop + clientHeight === scrollHeight) {
      console.log(scrollTop, clientHeight, scrollHeight);
      return { type: "append", shouldAddColumn: true, scrollTop: scrollHeight };
    } else if (scrollTop === 0) {
      console.log(scrollTop, clientHeight, scrollHeight);

      return { type: "prepend", shouldAddColumn: true, scrollTop: 0 };
    } else {
      return { type: "", shouldAddColumn: false };
    }
  };
  //calculate and update timer state
  const debounceCalcSecChange = debounce(function (scrollTop, childBoxHeight) {
    let difference =
      Math.round(
        (scrollTop - previousScrollTopRefSec.current) / childBoxHeight
      ) % 60;
    if (difference > 0) {
      setSelectedTime({ ...selectedTime, sec: difference + 1 });
    } else if (difference < 0) {
      setSelectedTime({ ...selectedTime, sec: 60 - difference });
    } else {
      setSelectedTime({ ...selectedTime, sec: 0 });
    }
  }, 250);

  let previousScrollTopRefSec = useRef();

  const eventScrollListenerSeconds = (e) => {
    let { clientHeight, scrollTop } = e.target;
    //update selectedTime
    let childBoxHeight = Math.floor(clientHeight / 3);
    debounceCalcSecChange(scrollTop, childBoxHeight);
    //6
    let { type, shouldAddColumn } = checkShouldAddColumn(e);
    if (shouldAddColumn) {
      //generate divs
      let appendArr = [];
      addMoreColumns("sec", appendArr);
      //append or prepend depending on where the user scrolled
      type === "append"
        ? setSecColumn([...secColumnState, ...appendArr])
        : setSecColumn([...appendArr, ...secColumnState]);
    }
  };

  const eventScrollListenerMinutes = (e) => {
    let { type, shouldAddColumn } = checkShouldAddColumn(e);
    if (shouldAddColumn) {
      let appendArr = [];
      addMoreColumns("min", appendArr);
      type === "append"
        ? setMinColumn([...minColumnState, ...appendArr])
        : setMinColumn([...appendArr, ...minColumnState]);
    }
  };

  //start the columns at the center and recenter when user reaches bottom or top
  useEffect(() => {
    //sec column centered
    let secColumns = document.getElementById("secondsColumn");
    let { scrollHeight: secScrollHeight } = secColumns;
    let secCenter = secScrollHeight / 2;
    secColumns.scrollTop = secCenter;
    setScrollTopValue({ ...scrollTopValue, scrollTopSec: secCenter });
    previousScrollTopRefSec.current = secCenter;

    //min column centered
    let minColumns = document.getElementById("minColumn");
    let minColumnsHeight = minColumns.scrollHeight;
    let minCenter = minColumnsHeight / 2 - minColumns.children[0].clientHeight;
    minColumns.scrollTo(0, minCenter);

    return () => {};
  }, []);

  useEffect(() => {
    //recenter sec and min when hitting bottom or top of scroll
    let secColumns = document.getElementById("secondsColumn");
    let minColumns = document.getElementById("minColumn");

    secColumns.addEventListener("scroll", eventScrollListenerSeconds);
    minColumns.addEventListener("scroll", eventScrollListenerMinutes);
    return () => {
      secColumns.removeEventListener("scroll", eventScrollListenerSeconds);
      minColumns.removeEventListener("scroll", eventScrollListenerMinutes);
    };
  }, []);
  return (
    <div className="h-1/2 ">
      {selectedTime.min}
      {selectedTime.sec}
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
