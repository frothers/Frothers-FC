import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Position, PlayerDetails } from './interfaces';
import { getAvailableNumberOfCores } from 'css-minimizer-webpack-plugin';

type AddPlayersProps = {
  callback: (player: PlayerDetails) => void
};

function getActivePlayers(): PlayerDetails[] {
  return [
    {
      name: "Chris Chester",
      position: "Defender"
    },
    {
      name: "Charles Daily",
      position: "Midfielder"
    },
    {
      name: "Lance Molyneaux",
      position: "Forward"
    },
    {
      name: "Ryan Kindle",
      position: "Goalkeeper"
    },
  ]
}

export const AddPlayers: React.FC<AddPlayersProps> = (props) => {

  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [textValue, setTextValue] = useState('' as Position);
  const [availablePlayers, setAvailablePlayers] = useState(getActivePlayers());

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    handleClose();

    let player: PlayerDetails = {
      name: "Undefined",
      position: "Defender",
    }

    if (dropdownValue){
      player.name = dropdownValue;
      player.position = availablePlayers.find((item) => item.name === player.name).position;
      console.log("dropdownValue ", player.name, player.position)
    } else {
      player.name = textValue;
      console.log("textValue ", player.name, player.position)
    }
    
    props.callback(player);
  };


  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value as Position);
  };
  const handleDropdownChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDropdownValue(event.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Player
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Label>Dropdown</Form.Label>
              <Form.Control as="select" onChange={handleDropdownChange} onSelect={handleDropdownChange}>
                <option value="">Choose Player</option>
                {availablePlayers.map((player) => {
                  return <option key={player.name} value={player.name}>{player.name}</option>
                })
                }
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={handleTextChange}>
              <Form.Label>Or, enter player</Form.Label>
              <Form.Control type="text" placeholder="Ring-in" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddPlayersProps;