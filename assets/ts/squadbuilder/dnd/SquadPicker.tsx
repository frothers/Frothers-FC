import type { FC } from "react";

import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";

export const SquadPicker: FC = () => {
  return (
    <div>
      <Container snapToGrid={true} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  );
};
