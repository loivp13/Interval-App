import React from "react";
import { useDispatch } from "react-redux";

const CtaButtons = ({ text }) => {
  const dispatch = useDispatch();
  return (
    <div className="min-w-4/10 mb-5 p-1 border-2 border-th-white rounded uppercase text-3xl hover:bg-th-white hover:text-th-primary">
      {text}
    </div>
  );
};

export default CtaButtons;
