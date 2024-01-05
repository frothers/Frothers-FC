import type { CSSProperties, FC, ReactNode } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'

import { Colors } from './Colours'

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  color: string
  forbidDrag: boolean
  children?: ReactNode
}

export const SourceBox: FC<SourceBoxProps> = memo(function SourceBox({
  color,
  forbidDrag,
  children,
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: color,
      canDrag: forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag, color],
  )

  const backgroundColor = useMemo(() => {
    switch (color) {
      case Colors.YELLOW:
        return 'lightgoldenrodyellow'
      case Colors.BLUE:
        return 'lightblue'
      default:
        return 'lightgoldenrodyellow'
    }
  }, [color])

  const containerStyle = useMemo(
    () => ({
      ...style,
      backgroundColor,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag, backgroundColor],
  )

  return (
    <div ref={drag} style={containerStyle} role="SourceBox" data-color={color}>
      {children}
    </div>
  )
})
