import React, { useState, useEffect } from "react";
import CloseIcon from "../../../images/BUTTON - cancel@3x.png";
import CtaButtons from "./CtaButtons";
import EditableTime from "./EditableTime";
import classNames from "classnames";

export default function EditTimeModal() {
  let [hidePane, setHidePane] = useState(false);
  let handleHidePaneOnFocus = () => {
    setHidePane((hidePane) => !hidePane);
  };
  let transformYButtonsClass = classNames(
    "flex",
    "justify-around",
    "transform",
    "duration-1000",
    { "-translate-y-full": hidePane }
  );
  return (
    <div className="absolute top-0 w-screen h-screen bg-th-primary z-10 p-4 flex flex-col justify-around items-center font-openSans">
      <div className="h-full w-full max-w-md">
        <div className="w-10 flex ml-auto">
          <img src={CloseIcon} alt="" />
        </div>
        <div className="flex justify-around w-full my-20">
          <div className="text-3xl w-1/5 text-center">min</div>
          <div className="text-3xl w-1/5 text-center">sec</div>
        </div>
        <EditableTime
          handleHidePaneOnFocus={handleHidePaneOnFocus}
          hidePane={hidePane}
        ></EditableTime>
        <div className={transformYButtonsClass}>
          <CtaButtons text={"back"}></CtaButtons>
          <CtaButtons text={"save"}></CtaButtons>
        </div>
      </div>
    </div>
  );
}
