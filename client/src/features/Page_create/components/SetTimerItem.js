import React, { useState } from "react";
import DeleteIcon from "../../../images/BUTTON - delete@3x.png";
import classNames from "classnames";

export default function SetTimerItem({ name, timeValue, timeUnit }) {
  const [time, setTime] = useState(timeUnit);
  const [isHidden, setIsHidden] = useState(false);

  const handleDeleteClick = () => {
    setIsHidden(true);
  };

  const generateHighlightClass = function (unit) {
    switch (unit) {
      case "min":
        return classNames(
          {
            "text-th-white": time === "min",
            "text-th-secondary": time !== "min",
          },
          "p-1"
        );
      case "sec":
        return classNames(
          {
            "text-th-white": time === "sec",
            "text-th-secondary": time !== "sec",
          },
          "p-1"
        );
      default:
        break;
    }
  };
  const SetTimerItemClass = classNames(
    "SetTimerItem",
    "flex",
    "justify-around",
    "items-center",
    "font-quicksand",
    "border-b",
    "border-th-white",
    " py-10",
    " w-full",
    { hidden: isHidden }
  );
  const renderLabel = () => {
    switch (timeUnit) {
      case "times":
        return <div className="text-th-white">times</div>;
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
          className="w-12 absolute left-6"
        >
          <img src={DeleteIcon} alt="" />
        </div>
      );
    } else {
      return;
    }
  };
  return (
    <div className={SetTimerItemClass}>
      {renderDeleteButton()}
      <h1 className="uppercase w-1/3">{name}</h1>
      <div className="flex flex-col justify-between items-center relative w-1/6">
        <div className="text-th-white border-th-white border flex justify-center p-2 mb-2 w-full rounded-md">
          {timeValue}
        </div>
        <div className="flex justify-around mb-2 absolute bottom-0 transform translate-y-full text-xl uppercase">
          {renderLabel()}
        </div>
      </div>
    </div>
  );
}
