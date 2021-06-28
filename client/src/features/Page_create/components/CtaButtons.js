import React from "react";

export default function CtaButtons({ text, setModalState }) {
  return (
    <div
      onClick={() => {
        setModalState(false);
      }}
      className="rounded-2xl border-2 bg-th-primary border-th-white text-xl md:text-4xl uppercase p-2 text-th-white w-1/2 text-center m-4 font-quicksand"
    >
      {text}
    </div>
  );
}
