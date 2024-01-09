
import { HTML5toTouch } from 'rdndmb-html5-to-touch'
import { DndProvider } from 'react-dnd-multi-backend'
import SquadPicker from './squadPicker'

function App() {
  return (
    <div className="App">
      <DndProvider options={HTML5toTouch}>
        <SquadPicker />
      </DndProvider>
    </div>
  )
}

export default App;