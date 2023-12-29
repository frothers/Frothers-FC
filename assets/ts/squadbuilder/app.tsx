import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggableLocation,
} from "react-beautiful-dnd";

type PlayerItem = {
  id: string;
  content: string;
};

type PlayerList = {
  id: string;
  players: PlayerItem[];
};

type PlayerLists = {
  available: PlayerList;
  playing: PlayerList;
};

type P = keyof PlayerLists;

// fake data generator
function getAvailablePlayers() {
  let items: PlayerItem[] = [];

  for (let i: number = 0; i < 5; i++) {
    let item = {
      id: `item-${i + 0}`,
      content: `item ${i + 0}`,
    };
    items.push(item);
  }

  return items;
}

// a little function to help us with reordering the result
function reorder(list: PlayerItem[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

/**
 * Moves an item from one list to another list.
 */
function move(
  source: PlayerItem[],
  destination: PlayerItem[],
  droppableSource: DraggableLocation,
  droppableDestination: DraggableLocation
) {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: PlayerList[] = [];
  result.push({ id: droppableSource.droppableId, players: sourceClone });
  result.push({ id: droppableDestination.droppableId, players: destClone });

  return result;
}

const grid = 8;

function getDroppable(item: PlayerItem, index: number) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          {item.content}
        </div>
      )}
    </Draggable>
  );
}

function getItemStyle(isDragging: boolean, draggableStyle: any) {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle,
  };
}

function getListStyle(isDraggingOver: boolean) {
  return {
    // background: isDraggingOver ? 'lightblue' : 'lightgrey',
    background: "lightgrey",
    padding: grid,
    width: 250,
  };
}

function App() {
  const [state, setState] = useState<PlayerLists>({
    available: { id: "available", players: getAvailablePlayers() },
    playing: { id: "playing", players: [] },
  });

  function getList(id: P) {
    return state[id];
  }

  function setList(listId: P, list: PlayerItem[]) {
    let newState = { ...state };
    newState[listId].players = list;

    setState(newState);
  }

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    // Same table, new location
    if (source.droppableId === destination.droppableId) {
      let items = reorder(
        getList(source.droppableId as P).players,
        source.index,
        destination.index
      );

      setList(source.droppableId as P, items);
    }
    // New table
    else {
      const result = move(
        getList(source.droppableId as P).players,
        getList(destination.droppableId as P).players,
        source,
        destination
      );

      for (let list of result) {
        setList(list.id as P, list.players);
      }
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Droppable droppableId="available">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.available.players.map((item, index) =>
                getDroppable(item, index)
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div
          style={{ background: "lightGray", width: "266px", height: "50px" }}
        ></div>
        <Droppable droppableId="droppable2">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {state.playing.players.map((item, index) =>
                getDroppable(item, index)
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
