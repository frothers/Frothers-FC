import type { CSSProperties, FC, ReactNode } from 'react'
import { memo, useCallback, useMemo, useState } from 'react'
import type { DragSourceMonitor } from 'react-dnd'
import { useDrag } from 'react-dnd'

const style: CSSProperties = {
  border: '1px dashed gray',
  padding: '0.5rem',
  margin: '0.5rem',
}

export interface SourceBoxProps {
  classNames: string
  forbidDrag: boolean
  children?: ReactNode
}

export const SourceBox: FC<SourceBoxProps> = memo(function SourceBox({
  classNames,
  forbidDrag,
  children,
}) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: classNames,
      canDrag: forbidDrag,
      collect: (monitor: DragSourceMonitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [forbidDrag],
  )

  const containerStyle = useMemo(
    () => ({
      ...style,
      opacity: isDragging ? 0.4 : 1,
      cursor: forbidDrag ? 'default' : 'move',
    }),
    [isDragging, forbidDrag],
  )

  return (
    <div ref={drag} style={containerStyle} role="SourceBox" className={classNames}>
      {children}
    </div>
  )
})
