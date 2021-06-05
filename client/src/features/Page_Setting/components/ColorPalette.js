import React from "react";
import {
  defaultTheme,
  lilacTheme,
  seafoamGreenTheme,
} from "../../changeThemeButton/changeThemeSlice";
import { useDispatch } from "react-redux";

const ColorPalette = ({ color }) => {
  const dispatch = useDispatch();
  const handleColorChangeClick = () => {
    console.log("triggered");
    switch (color) {
      case "#5A91AA":
        console.log("TRIGGER");
        dispatch(defaultTheme());
        break;
      case "#A6C4C7":
        dispatch(seafoamGreenTheme());
        break;

      case "#C8B2C8":
        dispatch(lilacTheme());
        break;
      default:
        dispatch(defaultTheme());
    }
  };
  return (
    <div
      onClick={() => {
        handleColorChangeClick();
      }}
      className="ColorPalette flex m-4"
    >
      <div className="w-5 h-10 half-circle-left bg-th-white"></div>
      <div
        style={{ backgroundColor: color }}
        className="w-5 h-10 half-circle-right"
      ></div>
    </div>
  );
};

export default ColorPalette;
