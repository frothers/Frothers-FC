import type { FC } from 'react'
import { useDrop } from 'react-dnd'
import { memo } from 'react'

export interface DustbinProps {
  accept: string[]
  onDrop: (item: any) => void
}

export const Dustbin: FC<DustbinProps> = memo(function Dustbin({
  accept,
  onDrop,
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })

  const isActive = isOver && canDrop
  let backgroundColor = '#222'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }

  return (
    <div ref={drop} style={{ backgroundColor }} data-testid="dustbin" className='dustbin'>
      {isActive
        ? 'Release to remove'
        : 'Remove'}
    </div>
  )
})
