import React, { useEffect, useState, useRef } from "react";
import {
  changeColorText,
  createEventScrollListener,
  changeInputEditPermission,
  limitChar2,
} from "./utils";
import styles from "./EditableTime.styles";
import { scrollTo } from "./utils/scrollToAnimation";

export default function EditableTime({
  handleHidePaneOnFocus,
  hidePane,
  setSelectedTime,
}) {
  let [scrollTopValue, setScrollTopValue] = useState({
    scrollTopMin: 0,
    scrollTopSec: 0,
  });

  //queue revert Input back to original value after user has edit and attempts to scroll, runs queue after hidePane is set to false. Triggers by useEffect below.

  let scrollTopSecRef = useRef();
  let scrollTopMinRef = useRef();
  let minRef = useRef();
  let secRef = useRef();
  let revertInputQueueRef = useRef({});

  const handleTimeInputChange = (e) => {
    let isSecColumn = e.target.classList.contains("sec");
    if (isSecColumn) {
      setSelectedTime((state) => {
        return { ...state, sec: e.target.value };
      });
    } else {
      setSelectedTime((state) => {
        return { ...state, min: e.target.value };
      });
    }
  };
  const handleEnqueueRevertInputOnBlur = (e, i) => {
    if (!revertInputQueueRef.current[i]) {
      revertInputQueueRef.current = {
        ...revertInputQueueRef.current,
        [i]: { element: e },
      };
    }
  };
  const handleRevertInputQueueOnScroll = () => {
    let queue = revertInputQueueRef.current;
    if (Object.entries(queue).length !== 0) {
      for (let e in queue) {
        queue[e].element.target.value = "";
      }
      revertInputQueueRef.current = {};
    }
  };

  //Add extra divs
  const addMoreColumns = (arr, keyId, rounds, colType) => {
    //max 60min | max 59sec
    for (let i = 0; i <= rounds; i++) {
      arr.push(
        <div key={i + keyId} className={styles.timeValues}>
          <input
            className={styles.input({ colType })}
            type="tel"
            min={0}
            max={60}
            maxLength={2}
            placeholder={`${i}`.padStart(2, 0)}
            onKeyPress={(e) => {
              limitChar2(e, handleTimeInputChange);
            }}
            onWheel={(e) => e.target.blur()}
            onFocus={(e) => {
              handleHidePaneOnFocus();
            }}
            onBlur={(e) => {
              //if not in queue, add element to
              handleEnqueueRevertInputOnBlur(e, keyId + i);
              handleHidePaneOnFocus();
            }}
          />
        </div>
      );
    }
  };
  //Generating the time value column
  const renderColumns = (keysArray, roundsArray, colType) => {
    let arr = [];
    roundsArray.forEach((rounds, i) => {
      addMoreColumns(arr, keysArray[i], rounds, colType);
    });
    return arr;
  };

  const [secColumnState, setSecColumn] = useState(
    renderColumns([1, 1000], [59, 59], "sec")
  );
  const [minColumnState, setMinColumn] = useState(
    renderColumns([2000, 3000], [60, 60], "min")
  );

  //calculate and update sec timer state
  const calcSecChange = function (
    scrollTop,
    childBoxHeight,
    children,
    centerIndex
  ) {
    let difference =
      Math.round((scrollTop - scrollTopSecRef.current) / childBoxHeight) % 60;
    let newCenterIndex = centerIndex + difference;

    changeColorText(children, newCenterIndex, [
      newCenterIndex + 1,
      newCenterIndex - 1,
    ]);

    changeInputEditPermission(children, newCenterIndex, [
      newCenterIndex + 1,
      newCenterIndex - 1,
    ]);

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
  };

  //calculate and update sec timer state
  const calcMinChange = function (
    scrollTop,
    childBoxHeight,
    children,
    centerIndex
  ) {
    let difference =
      Math.round((scrollTop - scrollTopMinRef.current) / childBoxHeight) % 61;
    let newCenterIndex = centerIndex + difference;

    //change text color
    changeColorText(children, newCenterIndex, [
      newCenterIndex + 1,
      newCenterIndex - 1,
    ]);
    changeInputEditPermission(children, newCenterIndex, [
      newCenterIndex + 1,
      newCenterIndex - 1,
    ]);

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
  };

  //start the columns at the center and recenter when user reaches bottom or top

  useEffect(() => {
    //sec column centered
    let secColumns = document.getElementById("secondsColumn");
    let { scrollHeight: secScrollHeight } = secColumns;
    let secCenter = secScrollHeight / 2;
    scrollTo(secCenter, 500, secColumns);

    scrollTopSecRef.current = secCenter;

    //min column centered
    let minColumns = document.getElementById("minColumn");
    let minColumnsHeight = minColumns.scrollHeight;
    let minCenter = minColumnsHeight / 2 - minColumns.children[0].clientHeight;
    scrollTo(minCenter, 500, minColumns);
    scrollTopMinRef.current = minCenter;

    //adding and removing scroll listener, setting minute and seconds refs
    const secEventScrollListener = createEventScrollListener(
      "sec",
      calcSecChange,
      calcMinChange,
      scrollTopSecRef,
      scrollTopMinRef,
      handleRevertInputQueueOnScroll
    );
    const minEventScrollListener = createEventScrollListener(
      "min",
      calcSecChange,
      calcMinChange,
      scrollTopSecRef,
      scrollTopMinRef,
      handleRevertInputQueueOnScroll
    );

    secColumns.addEventListener("scroll", secEventScrollListener);
    minColumns.addEventListener("scroll", minEventScrollListener);
    minRef.current = 0;
    secRef.current = 1;
    return () => {
      minRef.current = 0;
      secRef.current = 1;
      secColumns.removeEventListener("scroll", secEventScrollListener);
      minColumns.removeEventListener("scroll", minEventScrollListener);
    };
  }, []);
  useEffect(() => {
    let secColumns = document.getElementById("secondsColumn");
    let minColumns = document.getElementById("minColumn");
    if (hidePane) {
      secColumns.style.overflow = "hidden";
      minColumns.style.overflow = "hidden";
    } else {
      secColumns.style.overflow = "scroll";
      minColumns.style.overflow = "scroll";
    }
  }, [hidePane]);
  return (
    <div className="h-1/2">
      <div className="flex justify-center h-full items-center relative">
        {hidePane ? (
          <div className="HidePane absolute top-0 w-full h-1/3 bg-th-primary"></div>
        ) : (
          ""
        )}
        <div id="minColumn" className={styles.timeCol}>
          {minColumnState}
        </div>
        <div className="text-th-white text-8xl w-1/8 h-1/3 text-center font-bold flex items-center">
          :
        </div>
        <div id="secondsColumn" className={styles.timeCol}>
          {secColumnState}
        </div>
        {hidePane ? (
          <div className="HidePane absolute bottom-0 w-full h-1/3 bg-th-primary"></div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
