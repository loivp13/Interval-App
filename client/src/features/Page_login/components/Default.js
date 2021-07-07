import React from "react";
import { useSelector } from "react-redux";
import { selectUserSignIn } from "../../../appReduxSlices/userSlice";

const Default = ({ handleButtonClick }) => {
  const isUserSignIn = useSelector(selectUserSignIn);
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-16 mt-4">
          menu
        </h3>
      </header>
      <div className="LoginPage-main flex flex-col items-center w-full max-w-md cursor-pointer">
        {!isUserSignIn && (
          <>
            <div
              onClick={() => {
                handleButtonClick("login");
              }}
              className="rounded-3xl border-2 uppercase border-th-white text-4xl p-2 text-center w-3/4 mb-8"
            >
              log in
            </div>
            <div
              onClick={() => {
                handleButtonClick("signup");
              }}
              className="rounded-3xl border-2 uppercase border-th-white text-4xl p-2 text-center w-3/4 cursor-pointer"
            >
              sign up
            </div>
          </>
        )}
        {isUserSignIn && (
          <div
            onClick={() => {
              handleButtonClick("logout");
            }}
            className="rounded-3xl border-2 uppercase border-th-white text-4xl p-2 text-center w-3/4 cursor-pointer"
          >
            signout
          </div>
        )}
      </div>
    </>
  );
};

export default Default;
