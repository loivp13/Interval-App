import React from "react";
export default function CtaButtons({
  text,
  min,
  sec,
  type,
  setModalState,
  handleUpdateValue,
  handleSaveTimer,
  handleUpdateTimer,
  handleSetTimer,
  setEditModal,
  setEditMode,
  handleAction,
}) {
  const handleCallAction = () => {
    switch (type) {
      case "saveTimer":
        handleSaveTimer();
        break;
      case "startTimer":
        handleSetTimer();
        break;
      case "updateTimer":
        handleUpdateTimer();
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
      case "action":
        handleAction();
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
      className="rounded-2xl border-2  border-th-white text-xl md:text-2xl uppercase mx-5  text-th-white w-1/2 text-center p-3 font-quicksand cursor-pointer "
    >
      {text}
    </div>
  );
}
