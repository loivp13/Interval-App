import React from "react";

const CtaButtons = ({ text }) => {
  return (
    <div className="min-w-4/10 mb-5 p-1 border-2 border-th-white rounded-lg uppercase text-3xl hover:bg-th-white tracking-widest hover:text-th-primary">
      {text}
    </div>
  );
};

export default CtaButtons;
