import React from "react";
import { Draggable } from "react-beautiful-dnd";

function ListItem (obj: any){
  return (
    <Draggable draggableId={obj.item.id} index={obj.index}>
      {(provided, snapshot) => {
        return (
          <div
            className="drag-item"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <span>Content</span>
            <h4>{obj.item.id}</h4>
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListItem;
