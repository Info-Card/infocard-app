import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import { updateTag } from "state/ducks/tags/actions";

const UpdateCardModal = ({ strings, tag, setTag }) => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState(tag?.name);
  const handleUpdateTag = (event) => {
    event.preventDefault();
    dispatch(updateTag(tag.id, { name: tagName }));
    setTag(null);
  };

  return (
    <div>
      <Modal show={tag !== null}>
        <Modal.Header closeButton onHide={(e) => setTag(null)}>
          <Modal.Title>{strings["Update Tag information"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateTag}>
            <Form.Group controlId="name">
              <Form.Label>{strings["Tag Name"]}</Form.Label>
              <Form.Control
                type="name"
                placeholder={strings["Enter name"]}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              {strings["Update"]}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default multilanguage(UpdateCardModal);
