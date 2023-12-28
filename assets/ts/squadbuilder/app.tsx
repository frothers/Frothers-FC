import React from 'react';
import {DndContext} from '@dnd-kit/core';

import {Draggable} from './draggable';
import {Droppable} from './droppable';

export function App() {
  return (
    <DndContext>
      <Draggable />
      <Droppable />
    </DndContext>
  )
}