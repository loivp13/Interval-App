import React, { useState } from "react";
import { Link } from "react-router-dom";

//importing Icons
import WhiteHeartIcon from "../../images/BUTTON - desktop ver. WHITE heart@3x.png";
import WhiteHeartIconHover from "../../images/BUTTON - desktop ver. WHITE heart (HOVER)@3x.png";
import SettingImg from "../../images/BUTTON - settings@3x.png";

const Footer = () => {
  const [isHeartImgHover, setHeartImgHover] = useState(false);

  const renderWhiteButton = () => {
    return isHeartImgHover ? (
      <img className="w-1/4 h-auto" src={WhiteHeartIconHover} alt="Save Sets" />
    ) : (
      <img className="w-1/4 h-auto" src={WhiteHeartIcon} alt="Saved Sets" />
    );
  };

  return (
    <div className="Footer flex flex-row justify-between h-20 min-w-15.75rem mt-auto">
      <div
        onMouseEnter={() => {
          setHeartImgHover(true);
        }}
        onMouseLeave={() => {
          setHeartImgHover(false);
        }}
        className="flex flex-row justify-start items-center"
      >
        {renderWhiteButton()}
      </div>
      <div className="flex flex-row justify-end items-center">
        <Link className="w-1/4 h-auto" to="/setting">
          <img className="" src={SettingImg} alt="Settings" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
