import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { urlRegex } from "helpers/regex";
import { useDispatch, useSelector } from "react-redux";
import { addCustomLink } from "state/ducks/profile/actions";

const schema = yup.object().shape({
  url: yup.string().required().matches(urlRegex, "Please Enter a valid URL"),
  title: yup.string().max(32).required(),
});

export const AddCustomLinkModal = ({ show, setShow, link }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);
  const { success } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      ...link,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset, link]);

  useEffect(() => {
    if (success) {
      setShow(false);
    }
  }, [success, setShow]);

  const onSubmit = (data) => {
    if (link) {
      console.log("update is ok");
    } else {
      dispatch(addCustomLink(profile.id, data));
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        {link ? (
          <Modal.Title>Update Custom Link</Modal.Title>
        ) : (
          <Modal.Title>Add Custom Link</Modal.Title>
        )}
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              {...register("title")}
              placeholder="title"
              type="title"
            />
            <p className="text-danger">{errors.title?.message}</p>
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              {...register("url")}
              placeholder="Enter url"
              name="url"
            />
            <p className="text-danger">{errors.url?.message}</p>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              {...register("image")}
              type="file"
              placeholder="Choose image"
            />
            <p className="text-danger">{errors.image?.message}</p>
          </Form.Group>
          {link ? (
            <Button type="submit" variant="primary">
              Update
            </Button>
          ) : (
            <Button type="submit" variant="primary">
              Add
            </Button>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};