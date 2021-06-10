import React from "react";
import Navbar from "../features/globalComponents/navbar/Navbar";
export default function Mobile({ children }) {
  return (
    <div className="Mobile bg-th-primary h-screen flex flex-col font-quicksand p-8 items-center text-th-white ">
      <Navbar displayBack={true}></Navbar>
      <main className=" h-9/10 w-9/10 max-w-md flex flex-col items-center pt-8">
        {children}
      </main>
    </div>
  );
}
