import React from "react";

export default function CtaButtons({
  text,
  setModalState,
  min,
  sec,
  handleUpdateValue,
  type,
}) {
  const handleCallAction = () => {
    switch (type) {
      case "saveTimer":
        console.log("need fix");
        break;
      case "startTimer":
        console.log("need fix");
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
