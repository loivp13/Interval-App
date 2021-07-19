import React from "react";
import styles from "./SingleSetItem.styles";
import { Draggable } from "react-beautiful-dnd";

export default function SingleSetItem({
  editMode,
  deleteIcon,
  rearrangeIcon,
  totalAmountOfMins,
  handleDeleteTime,
  item,
  index,
  handleSelectCurrentTimer,
  handleToggleEditModal,
}) {
  return (
    <Draggable
      isDragDisabled={!editMode}
      index={index}
      draggableId={`${index}`}
      key={index}
    >
      {(provided) => {
        return (
          <div
            onClick={() => {
              if (!editMode) {
                handleSelectCurrentTimer(index);
                handleToggleEditModal(true);
              }
            }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={styles.TimerItem()}
          >
            <div
              onClick={() => {
                handleDeleteTime(index);
              }}
              className={styles.DeleteIcon(!editMode)}
            >
              <img className="" src={deleteIcon} alt="delete button" />
            </div>
            <div className={styles.RearrangeIcon(!editMode)}>
              <img src={rearrangeIcon} alt="rearrange button" />
            </div>
            <div className="uppercase">{item.timerName}</div>
            <div className="text-th-secondary text-xl">
              {totalAmountOfMins(item.timers)} total mins
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
