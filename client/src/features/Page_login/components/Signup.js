import React from "react";

const Signin = ({ handleButtonClick }) => {
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4">
          sign up
        </h3>
        <form className="flex flex-col items-center w-9/10 " action="">
          <input
            className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 mb-8 w-full font-openSans"
            type="text"
            placeholder="username or email"
          />
          <input
            className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 mb-8 w-full font-openSans"
            type="password"
            placeholder="password"
          />
          <input
            className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 mb-2 w-full font-openSans"
            type="password"
            placeholder="re-enter password"
          />
          <div className="flex w-full justify-between">
            <div
              onClick={() => {
                handleButtonClick("login");
              }}
              className=""
            >
              Login
            </div>
            <div className="text-md text-th-white border-th-white border-2 rounded-xl p-2 mt-2 uppercase">
              Save
            </div>
          </div>
        </form>
      </header>
    </>
  );
};

export default Signin;
