import update from 'immutability-helper'
import type { FC } from 'react'
import { useCallback, useState, useRef, useEffect } from 'react'
import { useDrop } from 'react-dnd'

import { DraggableBox } from './DraggableBox'
import { Dustbin } from './Dustbin'
import { AddPlayers } from './AddPlayers'
import { DownloadImage } from './DownloadImage'

import type { DragItem, Position, PlayerDetails } from './interfaces'
import { ItemTypes } from './ItemTypes'
import { snapToGrid as doSnapToGrid } from './snapToGrid'

export interface ContainerProps {
  snapToGrid: boolean
}

interface PlayerMap {
  [key: string]: { top: number; left: number; player: PlayerDetails}
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<PlayerMap>(getPlayersFromLS())
  const downloadElementRef = useRef(null);

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

  function getPlayersFromLS() {
    const data = window.localStorage.getItem('FROTHERS_SQUAD');
    if (data !== null) {
      return (JSON.parse(data)) as PlayerMap;
    }
    else {
      return {};
    }
  }

  const addPlayer = useCallback(
    (player: PlayerDetails) => {
      let data: PlayerMap = {}
      data[player.name] = { left: 0, top: -200, player: player}
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

  // Handle moving and dropping Players
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

  // Use local storage to save
  useEffect(() => {
    window.localStorage.setItem('FROTHERS_SQUAD', JSON.stringify(boxes));
   }, [boxes]);

   // Populate local storage on load
   useEffect(() => {
    setBoxes(getPlayersFromLS());
   }, []);
      

  return (
    <div ref={drop} className='squad-pitch container'>
      <div className="row h-100">
        <div ref={downloadElementRef} className="col-lg-9">
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
          {Object.keys(boxes).map((key) => (
            <DraggableBox
              key={key}
              id={key}
              {...(boxes[key] as { top: number; left: number; player: PlayerDetails })}
            />
          ))}
        </div>
        <div className="col-lg-3 player-roster">

          <div style={{ overflow: 'hidden', clear: 'both' }}>
            <AddPlayers callback={addPlayer}/>
            <Dustbin
            accept={[ItemTypes.BOX]}
            onDrop={(item) => handleRemove(item)}
            key="Dustbin"
          />
          <DownloadImage elementRef={downloadElementRef} />
          </div>
        </div>
      </div>
    </div>
  )
}
