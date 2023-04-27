import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { unlinkTag, updateTag } from "state/ducks/tags/actions";

const LinkedCardModal = (props) => {
  const strings = props;
  const [tagName, setTagName] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showDeleteTag, setShowDeleteTag] = useState("");
  const dispatch = useDispatch();
  const handleUpdateTag = (event) => {
    event.preventDefault();
    dispatch(updateTag(selectedTag.id, { name: tagName }));
    setSelectedTag(null);
  };
  const handleDeleteTag = (event) => {
    event.preventDefault();
    dispatch(unlinkTag(showDeleteTag));
    setShowDeleteTag("");
  };
  return (
    <div>
      <Modal show={selectedTag !== null}>
        <Modal.Header closeButton onHide={(e) => setSelectedTag(null)}>
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
      <Modal show={showDeleteTag !== ""}>
        <Modal.Header closeButton onHide={(e) => setShowDeleteTag("")}>
          <Modal.Title>{strings["Warning"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {strings["Are you sure you want to unlink this card?"]}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="danger" onClick={handleDeleteTag}>
            {strings["UnLink"]}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LinkedCardModal;
