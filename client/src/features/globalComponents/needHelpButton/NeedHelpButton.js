import React from "react";
import { Link, useRouteMatch } from "react-router-dom";

//import images
import BackButtonImage from "../../../images/ICON - BACK ARROW @3x.png";

const NeedHelpButton = () => {
  let isNotRootPath = !useRouteMatch({ path: "/", exact: true });
  let isHelpPath = useRouteMatch("/help");

  const renderHelpButton = () => {
    return isHelpPath ? (
      ""
    ) : (
      <div className="w-full items-end pr-5 h-14 text-th-linkText bg-th-primary text-right">
        <Link to="/help">
          <button className="h-full font-openSans">need help ?</button>
        </Link>
      </div>
    );
  };

  const renderBackButton = () => {
    console.log(isNotRootPath);
    return isNotRootPath ? (
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
    <div className="flex w-full">
      {renderBackButton()}
      {renderHelpButton()}
    </div>
  );
};

export default NeedHelpButton;
