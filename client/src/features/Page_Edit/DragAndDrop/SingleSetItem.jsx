import React from "react";
import styles from "./SingleSetItem.styles";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

export default function SingleSetItem({
  editMode,
  deleteIcon,
  rearrangeIcon,
  totalAmountOfMins,
  handleDeleteTime,
  item,
  index,
}) {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => {
    return {
      type: ItemTypes.SET_ITEM,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    };
  });

  return (
    <div ref={drag} key={index} className={styles.TimerItem()}>
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
        {item.totalSets} set(s) - {totalAmountOfMins(item.timers)} total mins
      </div>
    </div>
  );
}
