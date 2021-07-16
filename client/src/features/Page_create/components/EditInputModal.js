import React, { useEffect, useState } from "react";
import CtaButtons from "./CtaButtons";

const EditInputModal = ({ setName, handleSave, handleCancel }) => {
  let [newSetName, setNewSetName] = useState(setName);
  const handleInputFocus = (e) => {
    e.target.placeholder = "";
  };
  useEffect(() => {
    document.getElementById("setName").focus();
    return () => {};
  }, []);
  return (
    <div className="EditInputModal absolute top-1/4 transform  -translate-x-1/2 left-1/2 z-30 px-5 py-5 bg-th-overlay border rounded-2xl flex flex-col items-center">
      <h4 className="text-2xl m-1">new timer name</h4>
      <input
        id="setName"
        className="p-2 border border-th-white rounded-md text-th-white bg-th-overlay placeholder-white text-3xl focus:outline-none"
        type="text"
        maxLength="16"
        onChange={(e) => {
          setNewSetName(e.target.value);
        }}
      />
      <div className="flex  m-4 ">
        <CtaButtons
          text="cancel"
          type="action"
          handleAction={() => {
            handleCancel(false);
          }}
        ></CtaButtons>
        <CtaButtons
          text="save"
          type="action"
          handleAction={(e) => {
            console.log(newSetName);
            handleSave(newSetName, -1);
          }}
        ></CtaButtons>
      </div>
    </div>
  );
};

export default EditInputModal;
