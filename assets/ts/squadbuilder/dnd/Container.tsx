import update from 'immutability-helper'
import type { CSSProperties, FC } from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from './DraggableBox'
import type { DragItem } from './interfaces'
import { ItemTypes } from './ItemTypes'
import { snapToGrid as doSnapToGrid } from './snapToGrid'

interface Player {
  name: string,
  position: "Goalkeeper" | "Defender" | "Midfielder" | "Forward"
}

const players: Player[] = [
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
]

export interface ContainerProps {
  snapToGrid: boolean
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string }
}

function initPlayersBoxMap() {
  let map: BoxMap = {};
  players.forEach((player, index) => {
    map[player.name] = { top: 20, left: 80 * (index + 1), title: player.name }
  });
  return map;
}


export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<BoxMap>(initPlayersBoxMap())

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
              {...(boxes[key] as { top: number; left: number; title: string })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
