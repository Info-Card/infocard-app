import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { multilanguage } from "redux-multilanguage";
import { updateTag } from "state/ducks/tags/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Tag name is required is required").max(15),
});

const UpdateCardModal = ({ strings, tag, setTag }) => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: tag.name,
    },
    resolver: yupResolver(schema),
  });
  const handleUpdateTag = (data) => {
    console.log(data);
    dispatch(updateTag(tag.id, { name: data.name }));
    setTag(null);
    reset();
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
                type="name"
                placeholder={strings["Enter name"]}
                {...register("name")}
              ></Form.Control>
              <p className="validation-color">{errors.name?.message}</p>
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
