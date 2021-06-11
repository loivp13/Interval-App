import React from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Timer from "./components/Timer";

export default function ActiveTimerPage() {
  return (
    <MobileLayout>
      <Navbar displayHelp={true} displayBack={true}></Navbar>
      <Timer timerName="Workout-hiit"></Timer>
    </MobileLayout>
  );
}
