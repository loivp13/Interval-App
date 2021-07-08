import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const DragAndDropBox = ({ handleOnDragEnd, children }) => {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="droppableTimers">
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {children}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

export default DragAndDropBox;
