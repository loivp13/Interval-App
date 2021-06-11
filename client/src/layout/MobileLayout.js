import React from "react";
export default function Mobile({ children }) {
  return (
    <div className="Mobile bg-th-primary h-screen flex flex-col font-quicksand p-8 items-center text-th-white ">
      <main className=" h-9/10 w-9/10 max-w-md flex flex-col items-center">
        {children}
      </main>
    </div>
  );
}
