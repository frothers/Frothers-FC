import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from './DraggableBox'
import { Dustbin } from './Dustbin'
import { AddPlayers } from './AddPlayers'
import type { DragItem, Position, PlayerDetails } from './interfaces'
import { ItemTypes } from './ItemTypes'
import { snapToGrid as doSnapToGrid } from './snapToGrid'

const playersPerRow = 4;
const pixelTopShift = 100;
const pixelLeftShift = 120;


const players: PlayerDetails[] = [
 
]

export interface ContainerProps {
  snapToGrid: boolean
}

interface PlayerMap {
  [key: string]: { top: number; left: number; player: PlayerDetails}
}

function initPlayersBoxMap() {
  let map: PlayerMap = {};
  players.forEach((player, index) => {
    let leftShift = index % playersPerRow * pixelLeftShift;
    let topShift = Math.floor(index / playersPerRow) * pixelTopShift;
    map[player.name] = { top: topShift, left: leftShift, player: player }
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

  const addPlayer = useCallback(
    (player: PlayerDetails) => {
      let data: PlayerMap = {}
      data[player.name] = { left: 10, top: 10, player: player}
      setBoxes(update(boxes, {$merge: data}));
    },
    [boxes],
  )
  const handleRemove = useCallback(
    (item: { id: string }) => {
      setBoxes(update(boxes, {$unset: [item.id]}));
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

        if (delta === null){
          return undefined;
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
        <div className="col-lg-9">
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
        <div className="col-lg-3 player-roster">

          <div style={{ overflow: 'hidden', clear: 'both', padding: '15px' }}>
            <AddPlayers callback={addPlayer}/>
            <Dustbin
            accept={[ItemTypes.BOX]}
            onDrop={(item) => handleRemove(item)}
            key="Dustbin"
          />
          </div>
         
          {Object.keys(boxes).map((key) => (
            <DraggableBox
              key={key}
              id={key}
              {...(boxes[key] as { top: number; left: number; player: PlayerDetails })}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
