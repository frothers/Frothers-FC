
export interface DragItem {
    id: string
    type: string
    left: number
    top: number
  }

  export type Position = "Goal Keeper" | "Defender" | "Midfielder" | "Forward"

export type PlayerDetails = {
  position: Position,
  name: string
}