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
  setEditModal,
  setEditMode,
}) {
  const handleCallAction = () => {
    switch (type) {
      case "saveTimer":
        handleSaveTimer();
        break;
      case "startTimer":
        handleSetTimer();
        break;
      case "backToSetTimer":
        setModalState ? setModalState(false) : setEditModal(false);
        if (setEditMode) {
          setEditMode();
        }
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
      className="rounded-2xl border-2 bg-th-primary border-th-white text-xl md:text-4xl uppercase  text-th-white w-1/2 m-1 text-center p-3 font-quicksand cursor-pointer "
    >
      {text}
    </div>
  );
}
