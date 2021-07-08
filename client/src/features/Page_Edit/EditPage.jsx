import React, { useState } from "react";
import MobileLayout from "../../layout/MobileLayout";
import Navbar from "../globalComponents/navbar/Navbar";
import Footer from "../footer/Footer";
import rearrangeIcon from "../../images/ICON - rearrange@3x.png";
import deleteIcon from "../../images/BUTTON - delete@3x.png";
import DragAndDropBox from "./DragAndDrop/DragAndDropBox.jsx";
import GenerateSetItems from "./DragAndDrop/GenerateSetItems";
import { selectUserSignIn } from "../../appReduxSlices/userSlice";
import { useSelector } from "react-redux";

export default function EditPage() {
  let isUserSignIn = useSelector(selectUserSignIn);
  let localTimer = JSON.parse(localStorage.getItem("localTimers")) || [];
  let serverTimer = JSON.parse(localStorage.getItem("serverTimers")) || [];
  let [editMode, setEditMode] = useState(true);

  const [allTimers, setAllTimers] = useState(
    isUserSignIn ? [...serverTimer] : [...localTimer]
  );

  const totalAmountOfMins = (timers) => {
    let sum = 0;
    for (let timer of timers) {
      sum += timer.times.min + timer.times.sec / 60;
    }
    return sum.toFixed(2);
  };

  const handleDeleteTime = (index) => {
    //exist only in local storage if has uuid
    let uuid = allTimers[index].uuid;
    if (uuid) {
      for (let i = 0; i < localTimer.length; i++) {
        let foundTimer = localTimer[i].uuid === uuid;
        if (foundTimer) {
          let firstHalf = localTimer.slice(0, i);
          let secondHalf = localTimer.slice(i + 1);
          localTimer = [...firstHalf, ...secondHalf];
          localStorage.setItem("localTimers", JSON.stringify(localTimer));
          setAllTimers([...localTimer]);
          break;
        }
      }
    } else {
      console.log("handle server deletion and localstorage serverTimer");
    }
  };
  const handleOnDragEnd = (result) => {
    const timers = Array.from(allTimers);
    let [reorderedItem] = timers.splice(result.source.index, 1);
    timers.splice(result.destination.index, 0, reorderedItem);
    setAllTimers(timers);
  };
  const renderAllTimers = () => {
    if (allTimers.length > 0) {
      return (
        <DragAndDropBox handleOnDragEnd={handleOnDragEnd}>
          <GenerateSetItems
            allTimers={allTimers}
            editMode={editMode}
            deleteIcon={deleteIcon}
            rearrangeIcon={rearrangeIcon}
            totalAmountOfMins={totalAmountOfMins}
            handleDeleteTime={handleDeleteTime}
          ></GenerateSetItems>
        </DragAndDropBox>
      );
    } else {
      <div className="NoTimerItem px-2 py-2 border-b border-th-white ">
        No timers saved.
      </div>;
    }
  };
  return (
    <div className="EditPage h-full min-h-screen md:h-screen">
      <MobileLayout>
        <Navbar
          displayEdit={true}
          displayBack={true}
          action={() => {
            setEditMode(!editMode);
          }}
        ></Navbar>
        <div className="max-w-md w-full h-full h-8/10vh">
          <div className="text-3xl text-th-secondary font-openSans mb-10 text-center">
            saved timers
          </div>
          <div className="w-full text-3xl  h-9/10">{renderAllTimers()}</div>
          <Footer></Footer>
        </div>
      </MobileLayout>
    </div>
  );
}