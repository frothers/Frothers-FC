import type { FC } from "react";
import { memo } from "react";

import { Position } from './interfaces'

export interface PlayerProps {
  title: string;
  position: Position
}

export const Player: FC<PlayerProps> = memo(function Player({ title, position }) {
  function renderShirt() {
    if (position === "Goal Keeper") {
      return <img src="/images/frothers-goalie_jersey.png" />
    } else {
      return <img src="/images/frothers_jersey.png" />
    }
  }
  return (
    <div className={"squad-player"} role={"Player"}>
      {renderShirt()}
      <div>{title}</div>
    </div>
  );
});
