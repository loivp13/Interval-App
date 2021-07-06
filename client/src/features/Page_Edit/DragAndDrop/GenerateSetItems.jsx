import React from "react";
import { useDrop } from "react-dnd";
import SingleSetItem from "./SingleSetItem";
import { ItemTypes } from "./ItemTypes";

export default function SetItems({
  allTimers,
  editMode,
  deleteIcon,
  rearrangeIcon,
  totalAmountOfMins,
  handleDeleteTime,
}) {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: ItemTypes.SET_ITEM,
      drop: () => console.log("drop"),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  );
  const generateAllTimerItems = () => {
    return allTimers.map((item, index) => {
      return (
        <SingleSetItem
          editMode={editMode}
          deleteIcon={deleteIcon}
          rearrangeIcon={rearrangeIcon}
          totalAmountOfMins={totalAmountOfMins}
          handleDeleteTime={handleDeleteTime}
          item={item}
          index={index}
        ></SingleSetItem>
      );
    });
  };

  return (
    <div ref={drop} className="AllTimers">
      {generateAllTimerItems()}
    </div>
  );
}
