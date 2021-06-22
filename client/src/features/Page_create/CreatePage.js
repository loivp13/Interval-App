import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import CtaButtons from "./components/CtaButtons";
import SetTimerItem from "./components/SetTimerItem";
import EditIcon from "../../images/ICON - pencil@3x.png";
import EditTimeModal from "./components/EditTimeModal";

export default function CreateTimer() {
  return (
    <div className="CreatePage relative">
      <EditTimeModal></EditTimeModal>
      <MobileLayout>
        <Navbar displayHelp={true} displayBack={true}></Navbar>
        <main className="text-3xl text-th-secondary w-full font-openSans  max-w-md mb-10">
          <header className="mb-6">
            <h1 className="text-4xl text-center">set timer</h1>
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
          <div className="flex p-6">
            <div className="w-6 mr-2">
              <img src={EditIcon} alt="" />
            </div>
            <div className="text-th-white text-2xl font-quicksand">
              edit names & times
            </div>
          </div>
          <div className="flex justify-around p-4">
            <CtaButtons text="save"></CtaButtons>
            <CtaButtons text="start"></CtaButtons>
          </div>
        </main>
        <Footer></Footer>
      </MobileLayout>
    </div>
  );
}
