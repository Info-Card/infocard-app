import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { urlRegex } from "helpers/regex";
import { useDispatch, useSelector } from "react-redux";
import { updateVideos } from "state/ducks/profile/actions";

const schema = yup.object().shape({
  url: yup.string().required().matches(urlRegex, "Please Enter a valid URL"),
});

export const AddVideoModal = ({ show, setShow }) => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.users);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (!show) {
      reset();
    }
  }, [show, reset]);

  const onSubmit = (data) => {
    const { url } = data;
    const videos = (profile.videos ?? []).filter((v) => v !== "");
    videos.push(url);
    dispatch(updateVideos(profile.id, { videos: videos }));
  };

  return (
    <Modal show={show}>
      <Modal.Header closeButton onHide={(e) => setShow(false)}>
        <Modal.Title>Add Youtube Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="url">
            <Form.Label>URL</Form.Label>
            <Form.Control {...register("url")} placeholder="" type="url" />
            <p className="text-danger">{errors.title?.message}</p>
          </Form.Group>

          <Button type="submit" variant="primary">
            ADD
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
