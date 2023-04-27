import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { linkTag } from "state/ducks/tags/actions";
import { TAG_RESET } from "state/ducks/tags/types";
import { LOGOUT } from "state/ducks/auth/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addCustomLink, updateProfileMedia } from "state/ducks/profile/actions";
import { Button, Form, Modal } from "react-bootstrap";

const urlRegix =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const schema = yup.object().shape({
  url: yup.string().required().matches(urlRegix, "Please Enter a valid URL"),
  title: yup.string().min(8).max(32).required(),
});

const HomePageModal = ({
  history,
  strings,
  setShowAddVideo,
  showAddVideo,
  setShowCustomLink,
  showCustomLink,
}) => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [videoURL, setVideoURL] = useState("");

  const [customLink, setCustomLink] = useState({ title: "", url: "" });
  const { tag, success: tagSuccess } = useSelector((state) => state.tags);
  const handleClose = () => {
    localStorage.removeItem("tagId");
    dispatch({ type: TAG_RESET });
  };

  const handleSwitch = () => {
    dispatch({ type: LOGOUT });
    history.push("/register");
  };

  const handleActivate = () => {
    dispatch(linkTag(tag.id));
  };
  const handleClose1 = () => {
    dispatch({ type: TAG_RESET });
  };
  const handleAddVideo = (data) => {
    setVideoURL(data);
    console.log(data);
    console.log(videoURL);
    const { url } = data;
    const videos = profile.videos ?? [];
    videos.push(url);
    dispatch(updateProfileMedia(profile.id, { videos: videos }));
    setVideoURL("");
  };
  const handleAddCustomLink = (data) => {
    console.log(data);
    dispatch(addCustomLink(profile.id, customLink));
    setCustomLink({ title: "", url: "" });
    setShowCustomLink(false);
  };
  return (
    <div>
      <Modal show={tag}>
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>{strings["Activate your product"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {
              strings[
                "If you want to link it with current account please select"
              ]
            }{" "}
            <span>
              <strong>
                "{strings["Activate to"]} {authUser.username}"
              </strong>
            </span>{" "}
            {
              strings[
                "or If you want to link it with different account please select 'Switch Account'"
              ]
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSwitch}>
            {strings["Switch Account"]}
          </Button>
          {authUser && (
            <Button variant="primary" onClick={handleActivate}>
              {strings["Activate to"]} {authUser.username}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={tagSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>{strings["Activation Completed"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {strings["You have successfully activated Info Card"]}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            {strings["Close"]}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showAddVideo}>
        <Modal.Header closeButton onHide={(e) => setShowAddVideo(false)}>
          <Modal.Title>{strings["Add Youtube Video"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddVideo)}>
            <Form.Group controlId="name">
              <Form.Label>{strings["URL"]}</Form.Label>
              <Form.Control
                {...register("url")}
                placeholder="Enter url"
                name="url"
              ></Form.Control>
            </Form.Group>
            <p>{errors.url?.message}</p>

            <Button type="submit" variant="primary">
              {strings["ADD"]}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal show={showCustomLink}>
        <Modal.Header closeButton onHide={(e) => setShowCustomLink(false)}>
          <Modal.Title>Add Custom Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleAddCustomLink)}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                {...register("title")}
                placeholder="title"
                type="title"
                onChange={(e) =>
                  setCustomLink({ ...customLink, title: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <p>{errors.title?.message}</p>
            <Form.Group controlId="name">
              <Form.Label>{strings["URL"]}</Form.Label>
              <Form.Control
                {...register("url")}
                placeholder="Enter url"
                name="url"
                onChange={(e) =>
                  setCustomLink({ ...customLink, url: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
            <p>{errors.url?.message}</p>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                placeholder="Choose image"
                onChange={(event) => {
                  if (event.target.files && event.target.files[0]) {
                    console.log();
                    setCustomLink({
                      ...customLink,
                      image: event.target.files,
                    });
                  }
                }}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              {strings["ADD"]}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default HomePageModal;
