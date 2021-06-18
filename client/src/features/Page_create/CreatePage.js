import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";

export default function CreateTimer() {
  const [allTimers, setAllTimers] = useState(
    JSON.parse(localStorage.getItem("allTimers"))
  );
  return (
    <div className="CreatePage">
      <MobileLayout>
        <Navbar displayEdit={true} displayBack={true}></Navbar>
        <main className="text-3xl text-th-secondary font-openSans  max-w-md mb-10">
          <header>
            <h1 className="text-3xl">set timer</h1>
          </header>
          <div className="w-full text-3xl">timer</div>
        </main>
        <Footer></Footer>
      </MobileLayout>
    </div>
  );
}
