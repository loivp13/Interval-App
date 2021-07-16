import React, { useState } from "react";
import { Link } from "react-router-dom";

//importing Icons
import WhiteHeartIcon from "../../images/BUTTON - desktop ver. WHITE heart@3x.png";
import WhiteHeartIconHover from "../../images/BUTTON - desktop ver. WHITE heart (HOVER)@3x.png";
import SettingImg from "../../images/BUTTON - settings@3x.png";

const Footer = () => {
  const [isHeartImgHover, setHeartImgHover] = useState(false);

  const renderHeartButton = () => {
    return isHeartImgHover ? (
      <img className="w-1/4 h-auto" src={WhiteHeartIconHover} alt="Save Sets" />
    ) : (
      <img className="w-1/4 h-auto" src={WhiteHeartIcon} alt="Saved Sets" />
    );
  };

  return (
    <div className="Footer flex flex-row justify-center h-20 w-full md:max-w-md mt-auto p-4">
      <div
        onMouseEnter={() => {
          setHeartImgHover(true);
        }}
        onMouseLeave={() => {
          setHeartImgHover(false);
        }}
        className="flex w-full flex-row justify-start items-center"
      >
        <Link to="/editTimer">{renderHeartButton()}</Link>
      </div>
      <div className="flex flex-row justify-end items-center">
        <Link className="w-full h-auto" to="/setting">
          <img className="w-10" src={SettingImg} alt="Settings" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
