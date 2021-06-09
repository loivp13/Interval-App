import React from "react";
import InputField from "./sharedComponents/InputField";
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
    .required("Field is required."),
  signup_username: yup.string().required("Field is required."),
  signup_checkPassword: yup
    .string()
    .required("Filed is required")
    .oneOf([yup.ref("signup_password"), null], "Password do not match"),
});

const Signin = ({ handleButtonClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    apiAxios.post("/auth", data);
  };
  return (
    <>
      <header>
        <h3 className="text-th-secondary text-4xl font-openSans mb-12 mt-4 text-center">
          sign up
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-9/10 "
          action=""
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
          <div className="flex justify-between w-full">
            <div
              onClick={() => {
                handleButtonClick("login");
              }}
              className="text-md text-th-white"
            >
              login
            </div>
            <button
              type="submit"
              className="text-md text-th-white uppercase border-2 border-th-white rounded-lg p-1"
            >
              sign up
            </button>
          </div>
        </form>
      </header>
    </>
  );
};

export default Signin;
