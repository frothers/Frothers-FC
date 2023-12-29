import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ListItem } from "./ListItem";
import { ItemType } from "./interface/index";

type ComponentType = {
  prefix: string;
  elements: Array<string>;
};

const DraggableElement = ({ prefix, elements }: ComponentType) => {
  return (
    <div className="droppable">
      <h5>Hello</h5>

      <Droppable droppableId={`${prefix}`}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {elements.map((item: ItemType, index: number) => (
              <ListItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default DraggableElement;
