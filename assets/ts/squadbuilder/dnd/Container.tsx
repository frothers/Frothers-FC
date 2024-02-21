import update from "immutability-helper";
import type { FC, ChangeEvent } from "react";
import { useCallback, useState, useRef, useEffect } from "react";
import { useDrop } from "react-dnd";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { DraggableBox } from "./DraggableBox";
import { Dustbin } from "./Dustbin";
import { AddPlayers } from "./AddPlayers";
import { DownloadImage } from "./DownloadImage";

import type { DragItem, SquadNames, PlayerDetails } from "./interfaces";
import { ItemTypes } from "./ItemTypes";
import { snapToGrid as doSnapToGrid } from "./snapToGrid";

export interface ContainerProps {
  snapToGrid: boolean;
}

interface PlayerMap {
  [key: string]: { top: number; left: number; player: PlayerDetails };
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [squad, setSquad] = useState("squad1" as SquadNames);
  const [boxes, setBoxes] = useState<PlayerMap>(getPlayersFromLS());

  const downloadElementRef = useRef(null);
  const fileInputRef = useRef(null);

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        })
      );
    },
    [boxes]
  );

  const handleTabChange = (selectedTab: string) => {
    setSquad(selectedTab as SquadNames);
  };

  function getPlayersFromLS() {
    const data = window.localStorage.getItem(squad);
    if (data !== null) {
      return JSON.parse(data) as PlayerMap;
    } else {
      return {};
    }
  }

  function saveLSData() {
    let json = JSON.stringify(getPlayersFromLS());
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.download = squad + ".json";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function loadJsonToLS(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      const contents = e?.target?.result;
      if (contents) {
        localStorage.setItem(squad, contents as string);
        getPlayersFromLS();
      }
    };
    reader.readAsText(file);
  }

  function handleUploadButtom(){
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const addPlayer = useCallback(
    (player: PlayerDetails) => {
      let data: PlayerMap = {};
      data[player.name] = { left: 0, top: -200, player: player };
      setBoxes(update(boxes, { $merge: data }));
    },
    [boxes]
  );

  const handleRemove = useCallback(
    (item: { id: string }) => {
      setBoxes(update(boxes, { $unset: [item.id] }));
    },
    [boxes]
  );

  // Handle moving and dropping Players
  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as {
          x: number;
          y: number;
        };

        if (delta === null) {
          return undefined;
        }

        let left = Math.round(item.left + delta.x);
        let top = Math.round(item.top + delta.y);
        if (snapToGrid) {
          [left, top] = doSnapToGrid(left, top);
        }

        moveBox(item.id, left, top);
        return undefined;
      },
    }),
    [moveBox]
  );

  // Use local storage to save
  useEffect(() => {
    window.localStorage.setItem(squad, JSON.stringify(boxes));
  }, [boxes]);

  // Populate local storage on load
  useEffect(() => {
    setBoxes(getPlayersFromLS());
  }, [squad]);

  return (
    <div ref={drop} className="squad-pitch container">
      <Row className="h-100">
        <Col lg={9} ref={downloadElementRef}>
          <div className="row h-100">
            <div className="col-sm white-field-stripe"></div>
            <div className="col-sm green-field-stripe"></div>
            <div className="col-sm white-field-stripe"></div>
          </div>
          <div className="row h-25 subs-bench"></div>
          {Object.keys(boxes).map((key) => (
            <DraggableBox
              key={key}
              id={key}
              {...(boxes[key] as {
                top: number;
                left: number;
                player: PlayerDetails;
              })}
            />
          ))}
        </Col>
        <Col lg={3} className="player-roster">
          <Row className="justify-content-center">
            <Col><AddPlayers callback={addPlayer} /></Col>
            <Col><Dustbin
              accept={[ItemTypes.BOX]}
              onDrop={(item) => handleRemove(item)}
              key="Dustbin"
            /></Col>
          </Row>
          <Row className="justify-content-center">
            <h5>Saved Squads</h5>
          </Row>
          <Row className="justify-content-center">
            <Tabs
              defaultActiveKey={squad}
              onSelect={handleTabChange}
              id="squad-selector"
              className="mb-3"
              fill
            >
              <Tab eventKey="squad1" title="1"></Tab>
              <Tab eventKey="squad2" title="2"></Tab>
              <Tab eventKey="squad3" title="3"></Tab>
            </Tabs>
          </Row>
          <Row className="justify-content-center">
            <DownloadImage elementRef={downloadElementRef} />
            <Button variant="info" onClick={saveLSData}>
              ⬇️ JSON
            </Button>
            <Button variant="info" onClick={handleUploadButtom}>
              ⬆️ JSON</Button>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control size="sm" type="file" ref={fileInputRef} onChange={loadJsonToLS} className="d-none"/>
            </Form.Group>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
