import React, { useState, useEffect } from "react";
import DeleteIcon from "../../../images/BUTTON - delete@3x.png";
import styles from "./SetTimerItem.styles";

export default function SetTimerItem({
  name,
  sec,
  min,
  timeUnit,
  toggleModal,
  timeValue,
  setCurrentEditItem,
}) {
  const [time, setTime] = useState(timeUnit);
  const [isHidden, setIsHidden] = useState(false);

  const handleDeleteClick = () => {
    setIsHidden(true);
  };

  const generateHighlightClass = function (unit) {
    switch (unit) {
      case "min":
        return styles.highlightMin({ time });
      case "sec":
        return styles.highlightSec({ time });
      default:
        break;
    }
  };
  const SetTimerItemClass = styles.setTimerItem({ hidden: isHidden });
  const renderLabel = () => {
    switch (timeUnit) {
      case "times":
        return <div className="text-th-white cursor-pointer">times</div>;
      default:
        return (
          <>
            <div className={`${generateHighlightClass("min")}`}>min</div>
            <div className="p-1">|</div>
            <div className={`${generateHighlightClass("sec")}`}>sec</div>
          </>
        );
    }
  };
  const renderDeleteButton = () => {
    if (name !== "Work") {
      return (
        <div
          onClick={() => {
            handleDeleteClick();
          }}
          className="w-12 absolute -left-12 transform translate-y-3px"
        >
          <img src={DeleteIcon} alt="" />
        </div>
      );
    } else {
      return;
    }
  };

  const renderItem = () => {
    if (name === "Sets") {
      return (
        <div
          onChange={(e) => {
            setCurrentEditItem(+e.target.value);
          }}
          className="flex flex-col justify-between items-center relative w-1/4"
        >
          <input
            placeholder={timeValue}
            className="text-th-white border-th-white border flex justify-center p-4 mb-2 w-full rounded-md text-center bg-th-primary placeholder-white focus:outline-none"
          ></input>
        </div>
      );
    } else {
      return (
        <div
          onClick={() => {
            setCurrentEditItem();
            toggleModal(true);
          }}
          className="flex flex-col justify-between items-center relative w-1/4"
        >
          <div className="text-th-white border-th-white border flex justify-center p-4 mb-2 w-full rounded-md">
            {min}:{sec.toString().padStart(2, 0)}
          </div>
        </div>
      );
    }
  };

  return (
    <div className={SetTimerItemClass}>
      <h1 className="uppercase w-1/3 relative flex items-center">
        {renderDeleteButton()}
        {name}
      </h1>
      {renderItem()}
    </div>
  );
}
