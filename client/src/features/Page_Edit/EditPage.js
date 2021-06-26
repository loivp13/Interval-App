import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";

export default function ActiveTimerPage() {
  const [allTimers, setAllTimers] = useState(
    JSON.parse(localStorage.getItem("allTimers"))
  );

  const renderAllTimers = () => {
    if (allTimers) {
      return "timers";
    } else {
      return (
        <div className="px-2 py-2 border-b border-th-white">
          No timers saved.
        </div>
      );
    }
  };
  return (
    <div className="EditPage h-full min-h-screen md:h-screen">
      <MobileLayout>
        <Navbar displayEdit={true} displayBack={true}></Navbar>
        <div className="text-3xl text-th-secondary font-openSans mb-10">
          saved timers
        </div>
        <div className="w-full text-3xl">{renderAllTimers()}</div>
        <Footer></Footer>
      </MobileLayout>
    </div>
  );
}
