import React, { useEffect } from "react";
import { render } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { flipSoundSwitch, selectSoundSetting } from "./SlideSwitchSlice";

const SlideSwitch = () => {
  let isSoundOn = useSelector(selectSoundSetting);
  let dispatch = useDispatch();

  //render class for 'On' Text then the opposite for 'Off' Text
  let currentSoundSetting = isSoundOn;
  const renderActiveClass = () => {
    if (currentSoundSetting) {
      currentSoundSetting = !currentSoundSetting;
      return "text-th-white";
    } else {
      currentSoundSetting = !currentSoundSetting;
      return "text-th-linkText";
    }
  };

  //render class for left or right alignment for ball of the switch
  const renderAlignmentClass = () => {
    if (isSoundOn) {
      return "";
    } else {
      return "justify-end";
    }
  };

  return (
    <div className="SlideSwitch ml-4">
      <h3 className="text-lg text-th-secondary tracking-wider">Sounds</h3>
      <div
        onClick={() => {
          dispatch(flipSoundSwitch());
        }}
        className={`flex w-1/2 justify-around items-center `}
      >
        <p className={renderActiveClass()}>On</p>
        <div
          className={`rounded-full p-1  w-8 h-4 flex items-center border border-th-white ${renderAlignmentClass()}`}
        >
          <div className="bg-th-white w-1 h-1 rounded-full justify-end"></div>
        </div>
        <p className={renderActiveClass()}>Off</p>
      </div>
    </div>
  );
};

export default SlideSwitch;
