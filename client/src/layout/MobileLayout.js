import React from "react";
export default function Mobile({ children }) {
  return (
    <div className="Mobile bg-th-primary h-screen flex flex-col font-quicksand items-center text-th-white ">
      <main className=" h-full w-9/10 flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
