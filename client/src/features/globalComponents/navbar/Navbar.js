import React from "react";
import { Link } from "react-router-dom";

//import images
import BackButtonImage from "../../../images/ICON - BACK ARROW @3x.png";
import MenuButtonImage from "../../../images/BUTTON - menu@3x.png";

const Navbar = ({ displayMenu, displayHelp, displayBack }) => {
  //render if true
  const renderMenuButton = () => {
    return displayMenu ? (
      <div className="w-16 pl-4">
        <Link to="/login">
          <img className="w-full h-auto" src={MenuButtonImage} alt="" />
        </Link>
      </div>
    ) : (
      ""
    );
  };

  //render if true
  const renderHelpButton = () => {
    return displayHelp ? (
      <div className="w-full items-end pr-5 h-14 text-th-linkText bg-th-primary text-right">
        <Link to="/help">
          <button className="h-full font-openSans text-th-needHelp">
            need help ?
          </button>
        </Link>
      </div>
    ) : (
      ""
    );
  };

  //render if true
  const renderBackButton = () => {
    return displayBack ? (
      <div className="w-3 h-auto text-th-linkText bg-th-primary text-right">
        <Link to="/">
          <img className="w-full h-full" src={BackButtonImage} alt="" />
        </Link>
      </div>
    ) : (
      ""
    );
  };

  return (
    <div className="Navbar flex items-center w-full sticky top-7">
      {renderMenuButton()}
      {renderBackButton()}
      {renderHelpButton()}
    </div>
  );
};

export default Navbar;
