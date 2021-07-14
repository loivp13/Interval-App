import React, { useState, useEffect } from "react";
import CtaButtons from "./CtaButtons";
import styles from "./EditSetModal.styles";
import EditIcon from "../../../images/ICON - pencil@3x.png";
import DeleteIcon from "../../../images/BUTTON - delete@3x.png";
import cloneDeep from "lodash/cloneDeep";
import EditTimeModal from "./EditTimeModal";
import { asyncSaveNewTimer } from "../../Page_ActiveTimer/components/timerSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { asyncUpdateTimer } from "../../Page_ActiveTimer/components/timerSlice";

export default function EditSetModal({
  sets,
  setEditModal,
  type,
  editMode,
  handleSetTimer,
  setEditMode,
  handleUpdateTimers,
}) {
  let dispatch = useDispatch();
  let history = useHistory();
  let [editableSet, setEditableSet] = useState(sets);
  let [showTimeModal, setShowTimeModal] = useState(false);
  let [ctaButtonText, setCtaButtonText] = useState(
    editMode ? "update set" : "save set"
  );
  let [currentEditItem, setCurrentEditItem] = useState(0);

  const handleOnChangeNameInput = (e, index) => {
    let newObj = cloneDeep(editableSet);
    if (index === -1) {
      newObj.timerName = e.target.value;
    } else {
      newObj.timers[index].currentTimerName = e.target.value;
    }
    setEditableSet(newObj);
  };

  const handleSaveSets = () => {
    dispatch(asyncSaveNewTimer({ timerData: editableSet, history }));
  };

  const handleUpdateSets = () => {
    setCtaButtonText("updated");
    handleUpdateTimers(editableSet);
    setEditModal(false);
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
            {editMode && (
              <div
                onClick={(e) => {
                  handleDeleteSet(index);
                }}
                data-id={index}
                className={styles.deleteIcon()}
              >
                <img src={DeleteIcon} alt="" />
              </div>
            )}
            <input
              disabled={!editMode}
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
                if (editMode) {
                  handleChangeCurrentEditItem(e);
                  setShowTimeModal(true);
                } else {
                  return;
                }
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

  const renderCtaButtons = () => {
    if (type === "create") {
      return (
        <CtaButtons
          type="saveTimer"
          handleSaveTimer={handleSaveSets}
          text={"save"}
        ></CtaButtons>
      );
    } else if (type === "edit" && !editMode) {
      return (
        <CtaButtons
          type="startTimer"
          handleSetTimer={handleSetTimer}
          text={"start timer"}
        ></CtaButtons>
      );
    } else {
      return (
        <CtaButtons
          type="updateTimer"
          handleUpdateTimer={handleUpdateSets}
          text={"update set"}
        ></CtaButtons>
      );
    }
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
        <div className="w-1/2 mt-1">
          <input
            onBlur={(e) => {
              handleOnChangeNameInput(e, -1);
            }}
            disabled={!editMode}
            className={styles.title()}
            type="text"
            placeholder={editableSet.timerName}
          />
          <img className={styles.editIcon()} src={EditIcon} alt="edit icon" />
        </div>
        <div className={styles.editableItemsContainer()}>
          <div className={styles.editableItemsBox()}>
            {renderEditableItem()}
          </div>
          <div className="flex w-full h-1/10 ">
            <CtaButtons
              type="backToSetTimer"
              setEditModal={setEditModal}
              setEditMode={setEditMode}
              text={"back"}
            ></CtaButtons>
            {renderCtaButtons()}
          </div>
        </div>
      </div>
    </div>
  );
}
