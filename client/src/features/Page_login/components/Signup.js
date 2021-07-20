import React, { useState } from "react";
import InputField from "./sharedComponents/InputField";
import AuthForm from "./sharedComponents/AuthForm";
import { useForm } from "react-hook-form";
import { apiAxios } from "../../../helpers/axios_api";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  signup_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required."),
  signup_password: yup
    .string()
    .min(6, "Minimum character is 6")
    .required("Password is required."),
  signup_username: yup.string().required("Username is required."),
  signup_checkPassword: yup
    .string()
    .required("Password is required")
    .oneOf([yup.ref("signup_password"), null], "Password do not match"),
});

const Signup = ({ handleButtonClick }) => {
  //toggle when server sends back an error
  const [serverErrorMessage, triggerServerErrorMessage] = useState({
    displayErrorMessage: false,
    errorMessage: "",
  });
  let { displayErrorMessage, errorMessage } = serverErrorMessage;
  const renderErrorMessage = () => {
    return displayErrorMessage ? errorMessage : "";
  };

  //toggle successfully signup
  const [displaySuccessMessage, toggleDisplayMessage] = useState(false);
  const renderSuccessMessage = () => {
    return displaySuccessMessage ? (
      <div className="SuccessMessage">
        <h1 className="text-5xl mb-4">YAY!</h1>
        <div className="text-th-white text-2xl mb-4">
          Your account was created. A confirmation email was sent
        </div>
        <div className="text-th-white text-2xl mb-4">
          Please check your email to verify your accountant.
        </div>
      </div>
    ) : (
      ""
    );
  };
  //react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    console.log("what");
    apiAxios
      .post("/auth", data)
      .then((data) => {
        console.log(data);
        toggleDisplayMessage(true);
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
        header={"sign up"}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        handleButtonClick={handleButtonClick}
        serverErrorMessage={errorMessage}
      >
        <InputField
          id="signup_email"
          placeholder="email"
          register={register}
          registerName="signup_email"
          errors={errors}
        ></InputField>
        <InputField
          id="signup_username"
          type="text"
          placeholder="username"
          register={register}
          registerName="signup_username"
          errors={errors}
        ></InputField>
        <InputField
          id="signup_password"
          type="password"
          placeholder="password"
          register={register}
          registerName="signup_password"
          errors={errors}
        ></InputField>
        <InputField
          id="signup_checkPassword"
          type="password"
          placeholder="re-enter password"
          register={register}
          registerName="signup_checkPassword"
          errors={errors}
        ></InputField>
        <div className="flex justify-between align w-full   transform -translate-y-1/2">
          <div
            onClick={() => {
              handleButtonClick("login");
            }}
            className="text-md text-th-white cursor-pointer"
          >
            login
          </div>
          <button
            type="submit"
            className="text-md mt-4 text-th-white uppercase border-2 border-th-white rounded-lg p-1 cursor-pointer"
          >
            Sign up
          </button>
        </div>
        {renderSuccessMessage()}
      </AuthForm>
    </>
  );
};

export default Signup;
