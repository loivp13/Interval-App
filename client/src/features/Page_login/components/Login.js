import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import ErrorIcon from "../../../images/errorIcon.png";
const Login = ({ handleButtonClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("data");
  };
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4">
          log in
        </h3>
      </header>
      {errors.login_username && (
        <div className="text-th-error text-xs uppercase font-openSans">
          Incorrect username or password
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center w-9/10"
        action=""
      >
        <fieldset className="flex  items-center mb-8">
          <input
            id="login_username"
            {...register("login_username", { required: true })}
            className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2  w-full font-openSans "
            type="text"
            placeholder="email"
          />
          {errors.login_username && (
            <span className="pl-2">
              <img src={ErrorIcon} className="w-4 h-auto" alt="" />
            </span>
          )}
        </fieldset>

        <fieldset className="flex  items-center mb-1">
          <input
            {...register("login_password", { required: true })}
            className="placeholder-th-secondary border-2 text-2xl bg-opacity-0  bg-transparent border-th-white rounded-lg p-2 w-full  font-openSans"
            placeholder="password"
          />
          {errors.login_password && (
            <span className="pl-2">
              <img src={ErrorIcon} className="w-4 h-auto" alt="" />
            </span>
          )}
        </fieldset>
        <div className="flex justify-between w-full">
          <div
            onClick={() => {
              handleButtonClick("forgotPw");
            }}
            className="text-md text-th-white"
          >
            forgot password?
          </div>
          <button
            type="submit"
            className="text-md mt-4 text-th-white uppercase border-2 border-th-white rounded-lg p-1"
          >
            Login
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
