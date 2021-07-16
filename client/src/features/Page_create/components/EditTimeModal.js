import React, { useState, useEffect } from "react";
import CtaButtons from "./CtaButtons";
import EditableTime from "./EditableTime";
import Footer from "../../footer/Footer";
import styles from "./EditTimeModal.style";

export default function EditTimeModal({ setModalState, handleUpdateValue }) {
  let [hidePane, setHidePane] = useState(false);
  let handleHidePaneOnFocus = () => {
    setHidePane((hidePane) => !hidePane);
  };
  let [selectedTime, setSelectedTime] = useState({ min: 0, sec: 1 });

  return (
    <div className="absolute top-0 w-screen h-screen bg-th-primary z-10 p-4 flex flex-col justify-around items-center font-openSans">
      <div className="h-full w-full max-w-md flex flex-col justify-between">
        <div className={styles.unitTextContainer({ hidden: hidePane })}>
          <div className={styles.unitText}>min</div>
          <div className={styles.unitText}>sec</div>
        </div>
        <EditableTime
          setSelectedTime={setSelectedTime}
          handleHidePaneOnFocus={handleHidePaneOnFocus}
          hidePane={hidePane}
        ></EditableTime>
        <div className={styles.buttonContainer({ hidden: hidePane })}>
          <CtaButtons
            type="backToSetTimer"
            setModalState={setModalState}
            text={"back"}
          ></CtaButtons>
          <CtaButtons
            type="saveBackToSetTimer"
            {...selectedTime}
            setModalState={setModalState}
            handleUpdateValue={handleUpdateValue}
            text={"save"}
          ></CtaButtons>
        </div>
        <Footer> </Footer>
      </div>
    </div>
  );
}
