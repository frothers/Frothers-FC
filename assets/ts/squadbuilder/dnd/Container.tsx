import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from './DraggableBox'
import type { DragItem, Position } from './interfaces'
import { ItemTypes } from './ItemTypes'
import { snapToGrid as doSnapToGrid } from './snapToGrid'

const playersPerRow = 4;
const pixelTopShift = 100;
const pixelLeftShift = 120;


interface PlayerDetails {
  name: string,
  position: Position
}

const players: PlayerDetails[] = [
  {
    name: "Chris Chester",
    position: "Defender"
  },
  {
    name: "Lance Molyneaux",
    position: "Forward"
  },
  {
    name: "Charles Daily",
    position: "Midfielder"
  },
  {
    name: "Chris Chester2",
    position: "Defender"
  },
  {
    name: "Lance Molyneaux2",
    position: "Forward"
  },
  {
    name: "Charles Daily2",
    position: "Midfielder"
  },
  {
    name: "Chris Chester3",
    position: "Defender"
  },
  {
    name: "Lance Molyneaux3",
    position: "Forward"
  },
  {
    name: "Charles Daily3",
    position: "Midfielder"
  },
]

export interface ContainerProps {
  snapToGrid: boolean
}

interface PlayerMap {
  [key: string]: { top: number; left: number; title: string, position: Position }
}

function initPlayersBoxMap() {
  let map: PlayerMap = {};
  players.forEach((player, index) => {
    let leftShift = index % playersPerRow * pixelLeftShift;
    let topShift = Math.floor(index / playersPerRow) * pixelTopShift;
    map[player.name] = { top: topShift, left: leftShift, title: player.name, position: player.position }
  });
  return map;
}


export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<PlayerMap>(initPlayersBoxMap())

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number
          y: number
        }

        let left = Math.round(item.left + delta.x)
        let top = Math.round(item.top + delta.y)
        if (snapToGrid) {
          ;[left, top] = doSnapToGrid(left, top)
        }

        moveBox(item.id, left, top)
        return undefined
      },
    }),
    [moveBox],
  )

  return (
    <div ref={drop} className='squad-pitch container'>
      <div className="row h-100">
        <div className="col-lg-7">
          <div className="row h-75">
            <div className="col-sm white-field-stripe">
            </div>
            <div className="col-sm green-field-stripe">
            </div>
            <div className="col-sm white-field-stripe">
            </div>
          </div>
          <div className="row h-25 subs-bench">
          </div>
        </div>
        <div className="col-lg-5 player-roster">


          {Object.keys(boxes).map((key) => (
            <DraggableBox
              key={key}
              id={key}
              {...(boxes[key] as { top: number; left: number; title: string,  position: Position })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
