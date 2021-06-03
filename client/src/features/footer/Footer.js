import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import WhiteHeartsImg from "../../images/BUTTON - desktop ver. WHITE heart@3x.png";
import WhiteHeartsImgHover from "../../images/BUTTON - desktop ver. WHITE heart (HOVER)@3x.png";
import SettingImg from "../../images/BUTTON - settings@3x.png";
import { selectTheme } from "../changeThemeButton/changeThemeSlice";

const Footer = () => {
  let theme = useSelector(selectTheme);
  const [isHeartImgHover, setHeartImgHover] = useState(false);

  return (
    <div className="flex flex-row h-20">
      <div
        onMouseEnter={() => {
          setHeartImgHover(true);
        }}
        onMouseLeave={() => {
          setHeartImgHover(false);
        }}
        className="flex flex-row justify-start items-center"
      >
        {isHeartImgHover ? (
          <img
            className="w-1/4 h-auto"
            src={WhiteHeartsImgHover}
            alt="Save Sets"
          />
        ) : (
          <img className="w-1/4 h-auto" src={WhiteHeartsImg} alt="Saved Sets" />
        )}
      </div>
      <div className="flex flex-row justify-end items-center">
        <img className="w-1/4 h-auto" src={SettingImg} alt="Settings" />
      </div>
    </div>
  );
};

export default Footer;
