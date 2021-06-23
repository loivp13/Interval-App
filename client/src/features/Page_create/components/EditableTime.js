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

  let scrollTopSecRef = useRef();
  let scrollTopMinRef = useRef();
  let minRef = useRef();
  let secRef = useRef();

  //Add extra divs
  const addMoreColumns = (type, arr, keyId) => {
    //max 60min | max 59sec
    let maxNum = type === "min" ? 60 : 59;
    for (let i = 0; i <= maxNum; i++) {
      arr.push(
        <div key={i + keyId} className={timeValuesClassNames}>
          {`${i}`.padStart(2, 0)}
        </div>
      );
    }
  };
  //Generating the Seconds column
  const renderSecColumns = () => {
    let secColumns = [];
    addMoreColumns("sec", secColumns, 1);
    addMoreColumns("sec", secColumns, 1000);
    secColumns.push(
      <div key={"lastSecNum"} className={timeValuesClassNames}>
        00
      </div>
    );
    return secColumns;
  };
  //Generate the Minutes column
  const renderMinColumns = () => {
    let minColumns = [];
    addMoreColumns("min", minColumns, 1);
    addMoreColumns("min", minColumns, 1000);
    return minColumns;
  };

  //Check if columns should center
  const checkShouldRecenterColumn = (clientHeight, scrollTop, scrollHeight) => {
    console.log(
      "🚀 ~ file: EditableTime.js ~ line 53 ~ checkShouldRecenterColumn ~ clientHeight, scrollTop, scrollHeight",
      clientHeight,
      scrollTop,
      scrollHeight
    );

    if (scrollTop + clientHeight === scrollHeight) {
      console.log("yes");
      return { type: "centerOffset1", shouldRecenterColumn: true };
    } else if (scrollTop === 0) {
      console.log("yes");

      return { type: "center", shouldRecenterColumn: true };
    } else {
      console.log("no");

      return { type: "", shouldRecenterColumn: false };
    }
  };

  const [secColumnState, setSecColumn] = useState(renderSecColumns());
  const [minColumnState, setMinColumn] = useState(renderMinColumns());

  //calculate and update sec timer state
  const debounceCalcSecChange = debounce(function (scrollTop, childBoxHeight) {
    let difference =
      Math.round((scrollTop - scrollTopSecRef.current) / childBoxHeight) % 60;
    if (difference > 0) {
      secRef.current = difference + 1;
      setSelectedTime({ min: minRef.current, sec: secRef.current });
    } else if (difference === -1) {
      secRef.current = difference + 1;
      setSelectedTime({ min: minRef.current, sec: secRef.current });
    } else if (difference < 0) {
      secRef.current = 61 - Math.abs(difference);
      setSelectedTime({ min: minRef.current, sec: secRef.current });
    } else {
      secRef.current = 1;
      setSelectedTime({ min: minRef.current, sec: secRef.current });
    }
  }, 250);

  //calculate and update sec timer state
  const debounceCalcMinChange = debounce(function (scrollTop, childBoxHeight) {
    let difference =
      Math.round((scrollTop - scrollTopMinRef.current) / childBoxHeight) % 60;
    if (difference > 0) {
      minRef.current = difference;
      setSelectedTime({ sec: secRef.current, min: minRef.current });
    } else if (difference < 0) {
      minRef.current = 61 - Math.abs(difference);
      setSelectedTime({ sec: secRef.current, min: minRef.current });
    } else {
      minRef.current = 0;
      setSelectedTime({ sec: secRef.current, min: minRef.current });
    }
  }, 250);

  //scroll listener for secs
  const eventScrollListenerSeconds = (e) => {
    let { clientHeight, scrollTop, scrollHeight } = e.target;

    //update selectedTime
    let childBoxHeight = Math.floor(clientHeight / 3);

    debounceCalcSecChange(scrollTop, childBoxHeight);
    let { type, shouldRecenterColumn } = checkShouldRecenterColumn(
      clientHeight,
      scrollTop,
      scrollHeight
    );

    if (shouldRecenterColumn) {
      type === "centerOffset1"
        ? (e.target.scrollTop =
            scrollTopSecRef.current - (2 * clientHeight) / 3)
        : (e.target.scrollTop = scrollTopSecRef.current);
    }
  };

  //scroll listener for minutes
  const eventScrollListenerMinutes = (e) => {
    let { clientHeight, scrollTop, scrollHeight } = e.target;

    let childBoxHeight = Math.floor(clientHeight / 3);

    debounceCalcMinChange(scrollTop, childBoxHeight);

    let { type, shouldRecenterColumn } = checkShouldRecenterColumn(
      clientHeight,
      scrollTop,
      scrollHeight
    );
    if (shouldRecenterColumn) {
      type === "centerOffset1"
        ? (e.target.scrollTop =
            scrollTopSecRef.current - (2 * clientHeight) / 3)
        : (e.target.scrollTop = scrollTopSecRef.current);
    }
  };

  //start the columns at the center and recenter when user reaches bottom or top
  useEffect(() => {
    //sec column centered
    let secColumns = document.getElementById("secondsColumn");
    let { scrollHeight: secScrollHeight } = secColumns;
    let secCenter = secScrollHeight / 2;
    secColumns.scrollTop = secCenter;
    scrollTopSecRef.current = secCenter;

    //min column centered
    let minColumns = document.getElementById("minColumn");
    let minColumnsHeight = minColumns.scrollHeight;
    let minCenter = minColumnsHeight / 2 - minColumns.children[0].clientHeight;
    minColumns.scrollTo(0, minCenter);
    scrollTopMinRef.current = minCenter;

    return () => {};
  }, []);

  //adding and removing scroll listener, setting minute and second refs.
  useEffect(() => {
    let secColumns = document.getElementById("secondsColumn");
    let minColumns = document.getElementById("minColumn");
    secColumns.addEventListener("scroll", eventScrollListenerSeconds);
    minColumns.addEventListener("scroll", eventScrollListenerMinutes);
    minRef.current = 0;
    secRef.current = 1;
    return () => {
      minRef.current = 0;
      secRef.current = 1;
      secColumns.removeEventListener("scroll", eventScrollListenerSeconds);
      minColumns.removeEventListener("scroll", eventScrollListenerMinutes);
    };
  }, []);

  return (
    <div className="h-1/2 ">
      {selectedTime.min}: {selectedTime.sec}
      <div className="flex justify-center h-full items-center relative">
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
