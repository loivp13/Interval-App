import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import ColorPalette from "./components/ColorPalette";
import SlideSwitch from "./components/SlideSwitch";
import { apiAxios } from "../../helpers/axios_api";
import InputModal from "../globalComponents/InputModal/InputModal";
import { useSelector } from "react-redux";
import { selectUserSignIn } from "../../appReduxSlices/userSlice";
const SettingPage = () => {
  let isSignIn = useSelector(selectUserSignIn);
  let [showInputModal, setShowInputModal] = useState(false);
  let [currentInputModal, setCurrentInputModal] = useState(0);
  const handleChangePasswordClick = (inputValue) => {
    apiAxios("/auth/reset-password", {
      newPassword: inputValue.newPw,
      currentPassword: inputValue.currentPw,
      token: localStorage.getItem("token"),
    });
  };

  const handleDeletePasswordClick = () => {};
  const InputData = [
    {
      inputText: ["Enter current password", "Enter new password"],
      buttonText: "Change Password",
      action: handleChangePasswordClick,
    },
    {
      inputText: ["Enter password"],
      buttonText: "Delete Account",
      action: handleDeletePasswordClick,
    },
  ];

  const renderAccountOptions = () => {
    if (!isSignIn) {
      return (
        <p className="ml-4">
          Sign in{" "}
          <Link className="text-th-white" to={"/login"}>
            here
          </Link>
        </p>
      );
    } else {
      return (
        <div className="ml-4">
          {" "}
          <p
            onClick={(e) => {
              e.stopPropagation();
              setCurrentInputModal(0);
              setShowInputModal(true);
            }}
            className="text-th-white text-lg ml-4 font-quicksand cursor-pointer"
          >
            Change password
          </p>
          <p
            onClick={(e) => {
              e.stopPropagation();
              setCurrentInputModal(1);
              setShowInputModal(true);
            }}
            className="text-th-white text-lg ml-4 font-quicksand cursor-pointer"
          >
            Delete account
          </p>
        </div>
      );
    }
  };
  return (
    <div
      onClick={() => {
        setShowInputModal(false);
      }}
      className="SettingPage h-full min-h-screen md:h-screen  bg-th-primary pb-0 flex flex-col items-center font-openSans"
    >
      <main className="self-center w-screen max-w-md px-8 relative">
        <Navbar displayBack={true}></Navbar>
        {showInputModal && (
          <InputModal inputData={InputData[currentInputModal]}></InputModal>
        )}
        <header>
          <h1 className="text-3xl text-th-secondary tracking-widest m-7 text-center">
            settings
          </h1>
        </header>
        <section className="SettingPage_Color mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            colors
          </h2>
          <div className="flex flex-row ">
            <ColorPalette color="#5A91AA"></ColorPalette>
            <ColorPalette color="#A6C4C7"></ColorPalette>
            <ColorPalette color="#C8B2C8"></ColorPalette>
          </div>
        </section>
        <section className="SettingPage_Notifications  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Notifications
          </h2>
          <SlideSwitch></SlideSwitch>
        </section>

        <section className="SettingPage_Account  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            Account
          </h2>
          {renderAccountOptions()}
        </section>
        <section className="SettingPage_About  mb-4">
          <h2 className="font-quicksand text-th-white text-2xl uppercase tracking-wide">
            About
          </h2>
          <p className="text-th-secondary text-lg ml-4">&copy; 2021</p>
          <p className="text-th-secondary text-lg ml-4">
            Designed by Lynna Huynh
          </p>
          <p className="text-th-secondary text-lg ml-4">
            Developed by Loi Pham
          </p>
          <br />

          <p className="text-th-secondary text-lg ml-4"> updated: 6.4.21</p>
          <p className="text-th-secondary text-lg ml-4">V1.0</p>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default SettingPage;
