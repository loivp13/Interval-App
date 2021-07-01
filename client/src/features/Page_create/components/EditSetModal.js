import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CtaButtons from "./CtaButtons";
import styles from "./EditSetModal.styles";
import EditIcon from "../../../images/ICON - pencil@3x.png";
import DeleteIcon from "../../../images/BUTTON - delete@3x.png";
import cloneDeep from "lodash/cloneDeep";
import EditTimeModal from "./EditTimeModal";
import { asyncSaveNewTimer } from "../../Page_ActiveTimer/components/timerSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

export default function EditSetModal({ sets, setEditModal }) {
  let dispatch = useDispatch();
  let history = useHistory();
  let [editableSet, setEditableSet] = useState(sets);
  let [showTimeModal, setShowTimeModal] = useState(false);
  let [ctaButtonText, setCtaButtonText] = useState("save set");
  let [currentEditItem, setCurrentEditItem] = useState(0);

  const handleOnChangeNameInput = (e, index) => {
    let newObj = cloneDeep(editableSet);
    if (index === -1) {
      newObj.currentTimerName = e.target.value;
    } else {
      newObj.timers[index].currentTimerName = e.target.value;
    }
    setEditableSet(newObj);
  };

  const handleSaveSets = () => {
    dispatch(asyncSaveNewTimer({ timerData: editableSet, history }));
  };

  const handleDeleteSet = (index) => {
    let newObj = cloneDeep(editableSet);
    newObj.timers = [
      ...newObj.timers.slice(0, index),
      ...newObj.timers.slice(index + 1),
    ];
    if (newObj.timers.length === 0) {
      setEditModal(false);
    }
    setEditableSet(newObj);
  };

  const handleChangeCurrentEditItem = (e) => {
    let id = +e.currentTarget.getAttribute("data-id");
    setCurrentEditItem(id);
  };

  const handleUpdateTime = (min, sec) => {
    let newObj = cloneDeep(editableSet);
    newObj.timers[currentEditItem].times.sec = sec;
    newObj.timers[currentEditItem].times.min = min;
    setEditableSet(newObj);
  };

  const renderEditableItem = () => {
    return editableSet.timers.map((time, index) => {
      return (
        <div key={index} className={styles.editItem()}>
          <div className={styles.currentTimerName()}>
            <div
              onClick={(e) => {
                handleDeleteSet(index);
              }}
              data-id={index}
              className={styles.deleteIcon()}
            >
              <img src={DeleteIcon} alt="" />
            </div>
            <input
              onBlur={(e) => {
                handleOnChangeNameInput(e, index);
              }}
              className={styles.editItemInput()}
              type="text"
              placeholder={time.currentTimerName || "Unnamed"}
            />
          </div>
          <div className={styles.timerValueBox()}>
            <div
              onClick={(e) => {
                handleChangeCurrentEditItem(e);
                setShowTimeModal(true);
              }}
              data-id={index}
              className={styles.timerValue()}
            >
              {time.times.min.toString().padStart(2, 0)}:
              {time.times.sec.toString().padStart(2, 0)}
            </div>
          </div>
        </div>
      );
    });
  };
  return (
    <div className="absolute top-0 w-screen h-screen bg-th-primary z-10 p-4 flex flex-col justify-around items-center font-openSans">
      {showTimeModal && (
        <EditTimeModal
          handleUpdateValue={handleUpdateTime}
          setModalState={setShowTimeModal}
        ></EditTimeModal>
      )}
      <div className="h-full w-full max-w-md flex flex-col items-center justify-between">
        <div className="w-1/2">
          <input
            onBlur={(e) => {
              handleOnChangeNameInput(e, -1);
            }}
            className={styles.title()}
            type="text"
            placeholder={editableSet.timerName}
          />
          <img className={styles.editIcon()} src={EditIcon} alt="edit icon" />
        </div>
        <div className={styles.editableItemsBox()}>{renderEditableItem()}</div>
        <CtaButtons
          type="saveTimer"
          handleSaveTimer={handleSaveSets}
          text={ctaButtonText}
        ></CtaButtons>
      </div>
    </div>
  );
}
