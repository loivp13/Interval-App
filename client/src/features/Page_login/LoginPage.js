import React, { useEffect, useState } from "react";
import Navbar from "../globalComponents/navbar/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPw from "./components/ForgotPw";
import Default from "./components/Default";

const LoginPage = () => {
  const [currentDisplay, setDisplay] = useState("default");

  const handleButtonClick = (type) => {
    switch (type) {
      case "default":
        return setDisplay("default");
      case "login":
        return setDisplay("login");
      case "signup":
        return setDisplay("signup");
      case "forgotPw":
        return setDisplay("forgotPw");
      default:
        return setDisplay("default");
    }
  };

  const renderView = () => {
    switch (currentDisplay) {
      case "default":
        return <Default handleButtonClick={handleButtonClick}></Default>;
      case "login":
        return <Login handleButtonClick={handleButtonClick}></Login>;
      case "signup":
        return <Signup handleButtonClick={handleButtonClick}></Signup>;
      case "forgotPw":
        return <ForgotPw handleButtonClick={handleButtonClick}></ForgotPw>;
      default:
        return <Default handleButtonClick={handleButtonClick}></Default>;
    }
  };

  return (
    <div className="LoginPage bg-th-primary h-screen flex flex-col font-quicksand p-8 items-center text-th-white">
      <Navbar displayBack={true}></Navbar>
      {renderView()}
    </div>
  );
};

export default LoginPage;
