import React, { useEffect, useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import { apiAxios } from "../../helpers/axios_api";
import { useParams } from "react-router-dom";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ErrorIcon from "../../images/errorIcon.png";

const schema = yup.object().shape({
  new_password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum character is 6"),
  check_password: yup
    .string()
    .required("Password is required")
    .min(6, "Minimum character is 6")
    .oneOf([yup.ref("new_password"), null], "Password do not match"),
});

export default function ResetPasswordPage() {
  let [text, setText] = useState("Reset Password");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const [errorMessage, triggerErrorMessage] = useState({
    displayErrorMessage: false,
    message: "",
  });
  let { displayErrorMessage, message } = errorMessage;
  const renderErrorMessage = () => {
    return displayErrorMessage ? message : "";
  };
  let { token } = useParams();
  const handleOnSubmit = (data) => {
    if (!token) {
      return triggerErrorMessage({
        displayErrorMessage: true,
        message: "No token found, please try again.",
      });
    }
    apiAxios
      .put("/auth/reset-password", { ...data, token })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <MobileLayout>
      <main className="w-full max-w-md ">
        <Navbar displayBack={true}></Navbar>
        <header>
          <h3 className="text-th-secondary text-4xl font-openSans mb-12 text-center mt-4">
            Reset your password
          </h3>
        </header>
        <form
          className="flex flex-col items-center justify-center mx-auto relative"
          onSubmit={handleSubmit(handleOnSubmit)}
          action=""
        >
          <fieldset className="flex flex-col items-center mb-5 w-full relative">
            <label className="text-3xl m-2" htmlFor="new_password">
              New Password
            </label>
            <input
              {...register("new_password")}
              id="new_password"
              className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 w-full  font-openSans focus:outline-none focus:ring focus:border-th-secondary "
              type="password"
            />
            {errors["new_password"] && (
              <span className="pl-2 absolute right-0 bottom-0 transform -translate-y-1/2 translate-x-full flex items-center ">
                <img src={ErrorIcon} className="w-4 md:w-8 h-auto " alt="" />
                <span className="p2-2 text-th-error">
                  {errors["new_password"].message}
                </span>
              </span>
            )}
          </fieldset>
          <fieldset className="flex flex-col items-center mb-10 w-full relative">
            <label className="text-3xl m-2" htmlFor="check_password">
              Reenter New Password
            </label>
            <input
              {...register("check_password")}
              id="check_password"
              className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 w-full  font-openSans focus:outline-none focus:ring focus:border-th-secondary "
              type="password"
            />
            {errors["check_password"] && (
              <span className="pl-2 absolute right-0 bottom-0 transform -translate-y-1/2 translate-x-full flex items-center ">
                <img src={ErrorIcon} className="w-4 md:w-8 h-auto " alt="" />
                <span className="p2-2 text-th-error">
                  {errors["check_password"].message}
                </span>
              </span>
            )}
          </fieldset>
          <div className="flex justify-between align w-full   transform -translate-y-1/2">
            <button
              type="submit"
              className="text-md mt-4 text-th-white uppercase border-2 border-th-white rounded-lg p-2 cursor-pointer"
            >
              Reset Password
            </button>
          </div>
          <div className="absolute text-th-error transform bottom-0 translate-y-full">
            {renderErrorMessage()}
          </div>
        </form>
      </main>
      <Footer></Footer>
    </MobileLayout>
  );
}
