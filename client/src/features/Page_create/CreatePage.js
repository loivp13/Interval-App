import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import CtaButtons from "./components/CtaButtons";
import SetTimerItem from "./components/SetTimerItem";
import EditIcon from "../../images/ICON - pencil@3x.png";
import EditTimeModal from "./components/EditTimeModal";
import EditSetModal from "./components/EditSetModal";
import {
  saveNewTimer,
  asyncSetNewTimer,
} from "../Page_ActiveTimer/components/timerSlice";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { generateTimers } from "./components/utils";

export default function CreateTimer() {
  let [showTimeModal, setModalState] = useState(false);
  let [showEditModal, setEditModal] = useState(false);
  let [workValue, setWorkValue] = useState({ min: 5, sec: 0 });
  let [breakValue, setBreakValue] = useState({ min: 0, sec: 30 });
  let [setsValue, setSetsValue] = useState(4);
  let [currentEditItem, setCurrentEditItem] = useState("work");
  let dispatch = useDispatch();
  let history = useHistory();

  const handleUpdateValue = (min, sec) => {
    console.log(sec, min);
    switch (currentEditItem) {
      case "work":
        setWorkValue({ min, sec });
        break;
      case "break":
        setBreakValue({ min, sec });
        break;
      default:
        break;
    }
  };
  const handleSaveTimer = () => {
    let timer = generateTimers(workValue, breakValue, setsValue, "save");
    dispatch(saveNewTimer(timer));
  };
  const handleSetTimer = () => {
    let timer = generateTimers(workValue, breakValue, setsValue, "set");
    dispatch(asyncSetNewTimer({ timerData: timer, history }));
  };
  return (
    <div className="CreatePage relative">
      {showEditModal && (
        <EditSetModal
          sets={generateTimers(workValue, breakValue, setsValue)}
          setEditModal={setEditModal}
        ></EditSetModal>
      )}
      {showTimeModal && (
        <EditTimeModal
          handleUpdateValue={handleUpdateValue}
          setModalState={setModalState}
        ></EditTimeModal>
      )}
      <MobileLayout>
        {!showTimeModal ? (
          <Navbar
            displayHelp={!showEditModal && true}
            displayBack={true}
          ></Navbar>
        ) : (
          ""
        )}
        <main className="text-3xl text-th-secondary w-full font-openSans  max-w-md mb-10">
          <header className="mb-2 md:mb-6">
            <h1 className=" text-2xl md:text-4xl text-center">set timer</h1>
          </header>
          <div className="text-xl md:text-4xl">
            <SetTimerItem
              name="Work"
              {...workValue}
              timeUnit="min"
              toggleModal={setModalState}
              setNewValue={setWorkValue}
              setCurrentEditItem={() => {
                setCurrentEditItem("work");
              }}
            ></SetTimerItem>
            <SetTimerItem
              name="Break"
              {...breakValue}
              timeUnit="min"
              toggleModal={setModalState}
              setNewValue={setBreakValue}
              setCurrentEditItem={() => {
                setCurrentEditItem("break");
              }}
            ></SetTimerItem>
            <SetTimerItem
              name="Sets"
              timeValue={setsValue}
              timeUnit="times"
              toggleModal={setModalState}
              setNewValue={setSetsValue}
            ></SetTimerItem>
          </div>
          <div
            onClick={() => {
              setEditModal(true);
            }}
            className="flex p-6"
          >
            <div className="w-6 mr-2">
              <img src={EditIcon} alt="" />
            </div>
            <div className="text-th-white text-xl  md:text-2xl font-quicksand">
              edit names & times
            </div>
          </div>
          <div className="flex justify-around p-4">
            <CtaButtons
              handleSaveTimer={handleSaveTimer}
              type="saveTimer"
              text="save"
            ></CtaButtons>
            <CtaButtons
              handleSetTimer={handleSetTimer}
              type="startTimer"
              text="start"
            ></CtaButtons>
          </div>
        </main>
        <Footer></Footer>
      </MobileLayout>
    </div>
  );
}
