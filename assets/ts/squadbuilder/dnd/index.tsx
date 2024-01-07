
import { TouchBackend } from 'react-dnd-touch-backend'
import SquadPicker from './squadPicker'
import { DndProvider } from 'react-dnd'

const backendOptions = {
  enableMouseEvents: true,
}

function App() {
  return (
    <div className="App">
      <DndProvider backend={TouchBackend} options={backendOptions}>
        <SquadPicker />
      </DndProvider>
    </div>
  )
}

export default App;