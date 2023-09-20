import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { urlRegex } from "helpers/regex";
import { useDispatch, useSelector } from "react-redux";
import { addCustomLink, updateCustomLink } from "state/ducks/profile/actions";

const schema = yup.object().shape({
  url: yup.string().required().matches(urlRegex, "Please Enter a valid URL"),
  title: yup.string().max(32).required(),
  image: yup
    .mixed()
    .test("is-image", "Please upload a valid image file", (value) => {
      if (!value || !value[0] || !value[0].type) {
        return false;
      }
      const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
      const isSupported = supportedFormats.includes(value[0].type);
      const isJfif = value[0].type === "image/jfif";
      if (!isSupported || isJfif) {
        return false;
      }
      return true;
    }),
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
    if (data.image.length === 0) {
      data.image = "";
    }
    if (link) {
      dispatch(updateCustomLink(profile.id, link.id, data));
      setShow(false);
    } else {
      dispatch(addCustomLink(profile.id, data));
      setShow(false);
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
            <p className="validation-color">{errors.title?.message}</p>
          </Form.Group>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control
              {...register("url")}
              placeholder="Enter url"
              name="url"
            />
            <p className="validation-color">{errors.url?.message}</p>
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              {...register("image")}
              type="file"
              accept="image/*"
              placeholder="Choose image"
            />
            <p className="validation-color">{errors.image?.message}</p>
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
