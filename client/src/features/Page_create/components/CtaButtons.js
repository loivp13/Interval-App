import React from "react";
export default function CtaButtons({
  text,
  min,
  sec,
  type,
  setModalState,
  handleUpdateValue,
  handleSaveTimer,
  handleSetTimer,
}) {
  const handleCallAction = () => {
    switch (type) {
      case "saveTimer":
        console.log("save timer");
        handleSaveTimer();
        break;
      case "startTimer":
        handleSetTimer();
        break;
      case "backToSetTimer":
        setModalState(false);
        break;
      case "saveBackToSetTimer":
        handleUpdateValue(min, sec);
        setModalState(false);
        break;
      default:
        break;
    }
  };
  return (
    <div
      onClick={() => {
        handleCallAction();
      }}
      className="rounded-2xl border-2 bg-th-primary border-th-white text-xl md:text-4xl uppercase p-2 text-th-white w-1/2 text-center m-4 font-quicksand cursor-pointer"
    >
      {text}
    </div>
  );
}
