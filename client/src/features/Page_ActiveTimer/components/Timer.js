import React from "react";

export default function Timer({ timerName }) {
  return (
    <div className="Timer text-openSans">
      <div className="text-3xl text-th-secondary uppercase text-center">
        {timerName}
      </div>
    </div>
  );
}
