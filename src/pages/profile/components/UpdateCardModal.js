import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import { updateTag } from "state/ducks/tags/actions";
import { useForm } from "react-hook-form";

const UpdateCardModal = ({ strings, tag, setTag }) => {
  const dispatch = useDispatch();
  const [tagName, setTagName] = useState(tag?.name);
  const { handleSubmit, register, errors } = useForm();

  const handleUpdateTag = (data) => {
    dispatch(updateTag(tag.id, { name: data.name }));
    setTag(null);
  };

  return (
    <div>
      <Modal show={tag !== null}>
        <Modal.Header closeButton onHide={(e) => setTag(null)}>
          <Modal.Title>{strings["Update Tag information"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleUpdateTag)}>
            <Form.Group controlId="name">
              <Form.Label>{strings["Tag Name"]}</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder={strings["Enter name"]}
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                ref={register({ required: true, maxLength: 15 })}
              />
              {errors.name && (
                <div className="text-danger">
                  Tag name is required and must be at most 15 characters.
                </div>
              )}
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
