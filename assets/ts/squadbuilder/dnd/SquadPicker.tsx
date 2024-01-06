import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { SourceBox } from './SourceBox'

export const SquadPicker: FC = () => {
  return (
    <div>
       <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
      <div style={{ float: 'left' }}>
        <SourceBox classNames='squad-bench' forbidDrag={true}>
          Squad
          <SourceBox classNames='squad-position' forbidDrag={true}>
            Defenders
            <SourceBox classNames='squad-player' forbidDrag={false}> Chris           </SourceBox>

            <SourceBox classNames='squad-player' forbidDrag={false}> Fashid           </SourceBox>
          </SourceBox>
          <SourceBox classNames='squad-position' forbidDrag={true}>
            Midfielders
          <SourceBox classNames='squad-player' forbidDrag={false}> Lance           </SourceBox>
          </SourceBox>
        </SourceBox>
      </div>

    </div>
      <Container snapToGrid={true} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  )
}
