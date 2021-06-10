import React, { useState } from "react";
import InputField from "./sharedComponents/InputField";
import AuthForm from "./sharedComponents/AuthForm";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  forgot_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required."),
});
const ForgotPw = ({ handleButtonClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <>
      <AuthForm
        header={"forgot password"}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
        handleButtonClick={handleButtonClick}
      >
        <InputField
          placeholder="email"
          register={register}
          registerName="forgot_email"
          errors={errors}
        ></InputField>
        <div className="flex justify-between items-start w-full   transform -translate-y-1/2">
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
            className="text-md text-th-white uppercase border-2 border-th-white rounded-lg p-1"
          >
            Reset
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

export default ForgotPw;
