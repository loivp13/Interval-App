import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import SetTimerItem from "./components/SetTimerItem";

export default function CreateTimer() {
  return (
    <div className="CreatePage">
      <MobileLayout>
        <Navbar displayEdit={true} displayBack={true}></Navbar>
        <main className="text-3xl text-th-secondary w-full font-openSans  max-w-md mb-10">
          <header className="mb-11">
            <h1 className="text-3xl text-center">set timer</h1>
          </header>
          <div className=" text-4xl">
            <SetTimerItem
              name="Work"
              timeValue="45"
              timeUnit="min"
            ></SetTimerItem>
            <SetTimerItem
              name="Break"
              timeValue="10"
              timeUnit="min"
            ></SetTimerItem>
            <SetTimerItem
              name="Sets"
              timeValue="4"
              timeUnit="times"
            ></SetTimerItem>
          </div>
        </main>
        <Footer></Footer>
      </MobileLayout>
    </div>
  );
}
