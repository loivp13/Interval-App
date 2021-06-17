import React, { useState } from "react";

import Footer from "../footer/Footer";
import CtaButtons from "./components/CtaButtons";
import Navbar from "../../features/globalComponents/navbar/Navbar";

export default function LandingPage({}) {
  return (
    <div className="LandingPage bg-th-primary h-screen flex flex-col justify-between items-center text-th-white font-quicksand">
      <Navbar displayMenu={true} displayHelp={true}></Navbar>
      <main className="Landing-main h-9/10 w-9/10 max-w-md flex flex-col justify-center items-center pt-8">
        <div className="SetIntervalCircle h-17/20vw w-17/20vw max-w-md max-h-md flex justify-center items-center rounded-full border-2 border-th-white mb-12 ">
          <h1 className="text-5xl p-9 text-center uppercase leading-tight tracking-widest">
            Set Interval Timer
          </h1>
        </div>
        <div className="text-3xl font-openSans text-th-secondary mb-8 tracking-widest">
          quickstart
        </div>
        <div className="QuickStartButtons h-auto w-8/10 text-center flex flex-row flex-wrap px-4 justify-between items-center ">
          <CtaButtons text={"00:45"}></CtaButtons>
          <CtaButtons text={"01:00"}></CtaButtons>
          <CtaButtons text={"05:00"}></CtaButtons>
          <CtaButtons text={"10:00"}></CtaButtons>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
}