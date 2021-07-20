import React, { useState } from "react";
import CtaButtons from "../../Page_create/components/CtaButtons";
const InputModal = ({ inputData }) => {
  const [message, setMessage] = useState("");
  const { inputText, buttonText, action } = inputData;
  let [inputValue, setInputValue] = useState({
    currentPw: "",
    newPw: "",
  });

  let [currentSelectedInput, setCurrentSelectedInput] = useState(0);

  const handleInputChange = (value) => {
    if (currentSelectedInput === 0) {
      setInputValue({ ...inputValue, currentPw: value });
    } else {
      setInputValue({ ...inputValue, newPw: value });
    }
  };
  const renderInput = () => {
    return inputText.map((item, i) => {
      return (
        <>
          <h4 className="text-2xl m-1">{item}</h4>

          <input
            className="p-2 border border-th-white rounded-md text-th-white bg-th-overlay placeholder-white text-3xl focus:outline-none"
            type="password"
            maxLength="16"
            onClick={() => {
              setCurrentSelectedInput(i);
            }}
            onChange={(e) => {
              handleInputChange(e.target.value);
            }}
          />
        </>
      );
    });
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="EditInputModal absolute top-1/4 transform  -translate-x-1/2 left-1/2 z-30 px-5 py-5 bg-th-overlay border rounded-2xl flex flex-col items-center">
        {renderInput()}
        <div className="flex justify-center m-4">
          <CtaButtons
            addCss="w-9/10"
            text={buttonText}
            type="action"
            handleAction={() => {
              action(inputValue);
            }}
          ></CtaButtons>
        </div>
      </div>
    </div>
  );
};

export default InputModal;
