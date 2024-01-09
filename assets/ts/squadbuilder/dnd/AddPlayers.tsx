import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import { Position } from './interfaces';

type AddPlayersProps = {
  callback: (playerName: string, position: Position) => void
};

export const AddPlayers: React.FC<AddPlayersProps> = (props) => {

  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState('');
  const [textValue, setTextValue] = useState('' as Position);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    handleClose();
    props.callback(dropdownValue, textValue);
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
                <option value="Chris">Chris</option>
                <option value="Charles">Charles</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" onChange={handleTextChange}>
              <Form.Label>Or, enter player</Form.Label>
              <Form.Control type="text" placeholder="Ring-in"/>
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