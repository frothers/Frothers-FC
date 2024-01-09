import type { FC } from "react";
import { memo } from "react";

import { Position } from './interfaces'

export interface PlayerProps {
  title: string;
  position: Position
}

export const Player: FC<PlayerProps> = memo(function Player({ title, position }) {
  function renderShirt() {
    if (position === "Goalkeeper") {
      return <img src="/images/frothers-goalie_jersey.png" width="40" />
    } else {
      return <img src="/images/frothers_jersey.png" width="40" />
    }
  }
  return (
    <div className={"squad-player"} role={"Player"}>
      {renderShirt()}
      <div>{title}</div>
    </div>
  );
});
