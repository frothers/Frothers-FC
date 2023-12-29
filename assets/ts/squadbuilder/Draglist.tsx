import { useCallback, useEffect, useMemo, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./style/dragList.css";
import DraggableElement from "./DraggableElement";
import { ItemType } from "./interface/index";

const DragList = () => {
  const lists = useMemo(() => ["todo", "inProgress", "done"], []);
  const getItems = (count: number, prefix: string) =>
    Array.from({ length: count }).map((k) => {
      const randomId = Math.floor(Math.random() * 1000);
      return {
        id: `item-${Date.now() + randomId}`,
        prefix,
        content: `item ${Date.now() + randomId}`
      };
    });
  const generateLists = useCallback(
    () =>
      lists.reduce(
        (acc, listKey) => ({ ...acc, [listKey]: getItems(10, listKey) }),
        {}
      ),
    [lists]
  );

  const [elements, setElements] = useState(generateLists());

  const removeFromList = (list: ItemType[], index: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(index, 1);
    return [removed, result];
  };

  const addToList = useCallback((list: ItemType[], index: number, element) => {
    const result = Array.from(list);
    result.splice(index, 0, element);
    return result;
  }, []);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const listCopy: typeof elements = { ...elements };
      const sourceList = listCopy?.[result.source.droppableId];

      const [removedElement, newSourceList] = removeFromList(
        sourceList,
        result.source.index
      );

      listCopy[result.source.droppableId] = newSourceList;
      const destinationList = listCopy[result.destination.droppableId];
      listCopy[result.destination.droppableId] = addToList(
        destinationList,
        result.destination.index,
        removedElement
      );
      setElements(listCopy);
      console.log("DD", result, sourceList, listCopy);
    },
    [elements, addToList]
  );

  useEffect(() => {
    setElements(generateLists());
  }, [generateLists]);

  return (
    <div className="container">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="list-grid">
          {lists.map((listKey) => (
            <DraggableElement
              elements={elements[listKey]}
              key={listKey}
              prefix={listKey}
            />
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default DragList;
