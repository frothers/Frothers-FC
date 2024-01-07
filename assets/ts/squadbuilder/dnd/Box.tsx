import type { CSSProperties, FC } from "react";
import { memo } from "react";

export interface PlayerProps {
  title: string;
  position?: boolean;
  preview?: boolean;
}

export const Player: FC<PlayerProps> = memo(function Player({ title, position, preview }) {
  return (
    <div className={"squad-player"} role={preview ? "BoxPreview" : "Box"}>
      <img src="/images/frothers-goalie_jersey.png" width="40" />
      <div>{title}</div>
    </div>
  );
});
