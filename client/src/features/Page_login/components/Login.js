import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { apiAxios } from "../../../helpers/axios_api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import InputField from "../components/sharedComponents/InputField";
import AuthForm from "./sharedComponents/AuthForm";

const schema = yup.object().shape({
  login_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  login_password: yup.string().required("Password is required"),
});

const Login = ({ handleButtonClick }) => {
  //display server error message
  const [serverErrorMessage, triggerServerErrorMessage] = useState({
    displayErrorMessage: false,
    errorMessage: "",
  });
  let { displayErrorMessage, errorMessage } = serverErrorMessage;
  const renderErrorMessage = () => {
    return displayErrorMessage ? errorMessage : "";
  };

  //error handling with react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  let history = useHistory();
  const onSubmit = (data) => {
    apiAxios
      .post("/auth/login", data)
      .then((data) => {
        history.push("/timer");
      })
      .catch(({ response }) => {
        triggerServerErrorMessage({
          ...serverErrorMessage,
          errorMessage: response.data.message,
        });
      });
  };

  return (
    <>
      <AuthForm
        header={"log in"}
        handleSubmit={handleSubmit}
        handleButtonClick={handleButtonClick}
        onSubmit={onSubmit}
        errors={errors}
        serverErrorMessage={errorMessage}
      >
        <InputField
          id="login_email"
          placeholder="email"
          register={register}
          registerName="login_email"
          errors={errors}
        ></InputField>
        <InputField
          id="login_password"
          type="password"
          placeholder="password"
          register={register}
          registerName="login_password"
          errors={errors}
        ></InputField>
        <div className="flex justify-between align w-full  transform -translate-y-1/2">
          <div
            onClick={() => {
              handleButtonClick("forgotPw");
            }}
            className="text-md text-th-white  cursor-pointer"
          >
            forgot password?
          </div>
          <button
            type="submit"
            className="text-md text-th-white uppercase border-2 border-th-white rounded-lg p-1"
          >
            Login
          </button>
        </div>
        <div
          onClick={() => {
            handleButtonClick("signup");
          }}
          className="mt-10 text-th-white w-full text-center cursor-pointer"
        >
          sign up
        </div>
      </AuthForm>
    </>
  );
};

export default Login;
