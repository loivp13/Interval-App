import React, { useState } from "react";
import { Link } from "react-router-dom";
import { apiAxios } from "../../../helpers/axios_api";
import { useForm } from "react-hook-form";
import InputField from "../components/sharedComponents/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  login_email: yup
    .string()
    .email("Please enter a valid email")
    .required("Field is required"),
  login_password: yup.string().required("Field is required"),
});

const Login = ({ handleButtonClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    apiAxios
      .get()
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(errors);
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4">
          log in
        </h3>
      </header>
      {errors.login_username && (
        <div className="text-th-error text-xs uppercase font-openSans"></div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center max-w-md"
        action=""
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
