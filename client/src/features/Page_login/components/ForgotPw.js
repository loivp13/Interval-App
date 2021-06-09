import React, { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "./sharedComponents/InputField";
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
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4 text-center">
          forgot password
        </h3>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center  max-w-md"
        action=""
      >
        <InputField
          placeholder="email"
          register={register}
          registerName="forgot_email"
          errors={errors}
        ></InputField>

        <div className="flex justify-between w-full">
          <div
            onClick={() => {
              handleButtonClick("login");
            }}
            className="text-md text-th-white"
          >
            <div>sign in</div>
          </div>
          <button
            type="submit"
            className="text-md text-th-white uppercase border-2 border-th-white rounded-lg p-1"
          >
            Reset
          </button>
        </div>
      </form>
    </>
  );
};

export default ForgotPw;
