import React from "react";
import { asyncSetNewTimer } from "../../Page_ActiveTimer/components/timerSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const CtaButtons = ({ text, timerData }) => {
  let history = useHistory();
  const dispatch = useDispatch();
  console.log();
  return (
    <div
      onClick={() => {
        dispatch(asyncSetNewTimer({ timerData, history }));
      }}
      className="min-w-4/10 mb-5 p-1 border-2 border-th-white rounded-lg uppercase text-3xl hover:bg-th-white tracking-widest hover:text-th-primary"
    >
      {text}
    </div>
  );
};

export default CtaButtons;
