import React from "react";
import ErrorIcon from "../../../../images/errorIcon.png";

const InputField = ({
  id,
  type,
  placeholder,
  errors,
  register,
  registerName,
  extraClasses,
}) => {
  return (
    <fieldset className="flex items-center mb-10 w-full relative">
      <input
        id={id ? id : ""}
        {...register(registerName, { required: true })}
        className="placeholder-th-secondary text-2xl bg-transparent border-th-white rounded-lg border-2 p-2 w-full  font-openSans focus:outline-none focus:ring focus:border-th-secondary "
        type={type ? type : ""}
        placeholder={placeholder ? placeholder : ""}
      />
      {errors[registerName] && (
        <span className="pl-2 absolute right-0 transform translate-x-full">
          <img src={ErrorIcon} className="w-4 md:w-8 h-auto " alt="" />
        </span>
      )}
      {errors[registerName] && (
        <span className="p2-2 absolute top-0 transform -translate-y-full text-th-error">
          {errors[registerName].message}
        </span>
      )}
    </fieldset>
  );
};

export default InputField;
