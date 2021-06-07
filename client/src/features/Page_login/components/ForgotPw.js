import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPw = ({ handleButtonClick }) => {
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4">
          forgot password
        </h3>
      </header>

      <form className="flex flex-col items-center w-9/10 " action="">
        <input
          className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 mb-2 w-full font-openSans"
          onChange={(e) => {
            handleOnChange(e);
          }}
          type="text"
          placeholder="email"
        />
        <div className="flex justify-between w-full">
          <div className="text-md text-th-white">
            <Link to="/">sign in</Link>
          </div>
          <div
            onClick={() => {
              handleButtonClick("signup");
            }}
            className="text-md text-th-white uppercase border-2 border-th-white rounded-lg p-1"
          >
            Reset
          </div>
        </div>
      </form>
    </>
  );
};

export default ForgotPw;
