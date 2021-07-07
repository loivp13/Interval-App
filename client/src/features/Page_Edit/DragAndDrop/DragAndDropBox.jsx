import React from "react";
import { DndProvider } from "react-dnd-multi-backend";
import HTML5toTouch from "react-dnd-multi-backend/dist/esm/HTML5toTouch";

const DragAndDropBox = (props) => {
  return (
    <DndProvider className="DndProvider" options={HTML5toTouch}>
      {props.children}
    </DndProvider>
  );
};

export default DragAndDropBox;
