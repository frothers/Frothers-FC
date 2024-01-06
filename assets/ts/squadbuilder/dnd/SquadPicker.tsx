import type { FC } from "react";
import { useCallback, useState } from "react";

import { DraggableBox } from './DraggableBox'
import { Container } from "./Container";
import { CustomDragLayer } from "./CustomDragLayer";
import { SourceBox } from "./SourceBox";

export const SquadPicker: FC = () => {
  return (
    <div>

      <Container snapToGrid={true}>
      <div style={{ overflow: "hidden", clear: "both", margin: "-.5rem" }}>
        <div style={{ float: "left" }}>
          <SourceBox classNames="squad-bench" forbidDrag={true}>
            Squad
            <SourceBox classNames="squad-position" forbidDrag={true}>
              Defenders
              <DraggableBox
                key={'Chris'}
                id={'Chris'}
                top= {1}
                left= {1}
                title= {'Chris C'}
              />
              <SourceBox classNames="squad-player" forbidDrag={false}>
                {" "}
                Fashid{" "}
              </SourceBox>
            </SourceBox>
            <SourceBox classNames="squad-position" forbidDrag={true}>
              Midfielders
              <SourceBox classNames="squad-player" forbidDrag={false}>
                {" "}
                Lance{" "}
              </SourceBox>
            </SourceBox>
          </SourceBox>
        </div>
      </div>
      </Container>
      <CustomDragLayer snapToGrid={true}>
      </CustomDragLayer>
    </div>
  );
};
