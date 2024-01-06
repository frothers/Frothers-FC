import type { FC } from "react";
import { useCallback, useState } from "react";

import { DraggableBox } from './DraggableBox'
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";
import { SourceBox } from "./SourceBox";

export const SquadPicker: FC = () => {
  return (
    <div>

      <Container snapToGrid={true} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  );
};
