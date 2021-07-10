import React from "react";
import SingleSetItem from "./SingleSetItem";
import {} from "react-beautiful-dnd";

export default function SetItems({
  allTimers,
  editMode,
  deleteIcon,
  rearrangeIcon,
  totalAmountOfMins,
  handleDeleteTime,
  handleSelectCurrentTimer,
  handleToggleEditModal,
}) {
  const generateAllTimerItems = () => {
    return allTimers.map((item, index) => {
      return (
        <SingleSetItem
          key={index}
          editMode={editMode}
          deleteIcon={deleteIcon}
          rearrangeIcon={rearrangeIcon}
          totalAmountOfMins={totalAmountOfMins}
          handleDeleteTime={handleDeleteTime}
          item={item}
          index={index}
          handleSelectCurrentTimer={handleSelectCurrentTimer}
          handleToggleEditModal={handleToggleEditModal}
        ></SingleSetItem>
      );
    });
  };

  return <>{generateAllTimerItems()}</>;
}
