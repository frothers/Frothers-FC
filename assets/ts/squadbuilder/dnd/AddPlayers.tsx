import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Position, PlayerDetails } from "./interfaces";
import { getAvailableNumberOfCores } from "css-minimizer-webpack-plugin";
import { getSquadMembersData } from "../../apiQueries";
import { drop } from "lodash";

type AddPlayersProps = {
  callback: (player: PlayerDetails) => void;
};

async function getActivePlayers(): Promise<PlayerDetails[]> {
  let response = await getSquadMembersData();
  let squad: PlayerDetails[] = [];
  response.map((member) => {
    if (JSON.parse(member.active)) {
      let player: PlayerDetails = {
        name: member.title,
        position: member.position as Position,
      };
      squad.push(player);
    }
  });
  return squad;
}

export const AddPlayers: React.FC<AddPlayersProps> = (props) => {
  const [show, setShow] = useState(false);
  const [dropdownValue, setDropdownValue] = useState("");
  const [textValue, setTextValue] = useState("");
  const [availablePlayers, setAvailablePlayers] = useState([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    async function fetchData() {
      const playerData = await getActivePlayers();
      setAvailablePlayers(playerData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Create a new form event
    const newEvent = new Event(
      "submit"
    ) as unknown as React.FormEvent<HTMLFormElement>;
    // Pass the new event to the handleSubmit function
    if (dropdownValue) {
      handleSubmit(newEvent);
    }
  }, [dropdownValue]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClose();

    let player: PlayerDetails = {
      name: "Undefined",
      position: "Defender",
    };

    if (dropdownValue !== "") {
      let fullName = dropdownValue;
      let nameParts = fullName.split(" "); // ["John", "Doe"]

      let firstName = nameParts[0]; // "John"
      let lastName = nameParts[nameParts.length - 1]; // "Doe"

      let lastNameInitial = lastName[0]; // "D"

      let output = `${firstName} ${lastNameInitial}`; // "John D"

      player.name = output;
      player.position = availablePlayers.find(
        (item) => item.name === dropdownValue
      ).position;

      setDropdownValue("");

    } else {
      player.name = textValue;
    }

    props.callback(player);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Dropdown</Form.Label>
              <Form.Control
                as="select"
                onChange={handleDropdownChange}
                onSelect={handleDropdownChange}
              >
                <option value="">Choose Player</option>
                {availablePlayers.map((player) => {
                  return (
                    <option key={player.name} value={player.name}>
                      {player.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlInput1"
              onChange={handleTextChange}
            >
              <Form.Label>Or, enter player</Form.Label>
              <Form.Control type="text" placeholder="Ring-in" />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Player
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AddPlayersProps;
