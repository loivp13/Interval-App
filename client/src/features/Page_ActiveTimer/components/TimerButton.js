import React from "react";

export default function TimerButton({ action, text, icon }) {
  return (
    <button
      className="font-quicksand text-th-secondary focus:outline-none uppercase"
      onClick={() => {
        action();
      }}
    >
      <div className="">
        <img src={icon} alt="" />
      </div>
      {text}
    </button>
  );
}
