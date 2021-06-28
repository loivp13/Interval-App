import React, { useState, useEffect } from "react";
import CloseIcon from "../../../images/BUTTON - cancel@3x.png";
import CtaButtons from "./CtaButtons";
import EditableTime from "./EditableTime";
import classNames from "classnames";
import { transform } from "lodash";
import styles from "./EditTImeModal.styles";

export default function EditTimeModal({ setModalState }) {
  let [hidePane, setHidePane] = useState(false);
  let handleHidePaneOnFocus = () => {
    setHidePane((hidePane) => !hidePane);
  };
  return (
    <div className="absolute top-0 w-screen h-screen bg-th-primary z-10 p-4 flex flex-col justify-around items-center font-openSans">
      <div className="h-full w-full max-w-md">
        <div className="w-10 flex ml-auto">
          <img src={CloseIcon} alt="" />
        </div>
        <div className={styles.unitTextContainer({ hidden: hidePane })}>
          <div className={styles.unitText}>min</div>
          <div className={styles.unitText}>sec</div>
        </div>
        <EditableTime
          handleHidePaneOnFocus={handleHidePaneOnFocus}
          hidePane={hidePane}
        ></EditableTime>
        <div className={styles.buttonContainer({ hidden: hidePane })}>
          <CtaButtons setModalState={setModalState} text={"back"}></CtaButtons>
          <CtaButtons text={"save"}></CtaButtons>
        </div>
      </div>
    </div>
  );
}
