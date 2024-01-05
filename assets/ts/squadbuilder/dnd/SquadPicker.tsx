import type { FC } from 'react'
import { useCallback, useState } from 'react'

import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { SourceBox } from './SourceBox'
import { Colors } from './Colours'

export const SquadPicker: FC = () => {
  return (
    <div>
       <div style={{ overflow: 'hidden', clear: 'both', margin: '-.5rem' }}>
      <div style={{ float: 'left' }}>
        <SourceBox color={Colors.BLUE} forbidDrag={true}>
          Squad
          <SourceBox color={Colors.YELLOW} forbidDrag={true}>
            Defenders
            <SourceBox color={Colors.BLUE} forbidDrag={false}> Chris           </SourceBox>

            <SourceBox color={Colors.BLUE} forbidDrag={false}> Fashid           </SourceBox>
          </SourceBox>
          <SourceBox color={Colors.YELLOW} forbidDrag={true}>
          <SourceBox color={Colors.BLUE} forbidDrag={false}> Lance           </SourceBox>
          </SourceBox>
        </SourceBox>
      </div>

    </div>
      <Container snapToGrid={true} />
      <CustomDragLayer snapToGrid={true} />
    </div>
  )
}
