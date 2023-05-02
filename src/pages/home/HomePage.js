import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "components/MainLayout";
import { Helmet } from "react-helmet";
import { getUser } from "state/ducks/users/actions";
import {
  deleteCustomLink,
  updateProfile,
  updateProfileMedia,
  addCustomLink,
} from "state/ducks/profile/actions";
import { Button, Col, Row, Form, Modal } from "react-bootstrap";
import Message from "components/Message";
import HomePlatform from "./components/HomePlatform";
import Toggle from "components/Toggle";
import VideoPlayer from "./components/VideoPlayer";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { multilanguage } from "redux-multilanguage";
import { PROFILE_RESET } from "state/ducks/profile/types";
import { linkTag } from "state/ducks/tags/actions";
import { TAG_RESET } from "state/ducks/tags/types";
import { LOGOUT } from "state/ducks/auth/types";
import Loader from "components/Loader";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Slider from "react-slick";

const urlRegix =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
const schema = yup.object().shape({
  url: yup.string().required().matches(urlRegix, "Please Enter a valid URL"),
  title: yup.string().max(32).required(),
});
const HomePage = ({ history, strings }) => {
  const [image, setImage] = useState();
  const [imageError, setImageError] = useState(null);
  const handleImageChange = (event) => {
    const selectedImage = event.target.files[0];
    setImage(selectedImage);
  };
  const handleSubmitForLink = (event) => {
    // Prevent form submission
    // event.preventDefault();
    // Call function 1
    // handleSubmitForImage(event);
    handleAddCustomLink(event);
    // Call function 2
  };
  const handleSubmitForImage = async (event) => {
    // event.preventDefault();

    try {
      const schemaForImage = yup.object().shape({
        image: yup
          .mixed()
          .required("Please upload an image file")
          .test(
            "fileSize",
            "Image size must be no more than 5 MB",
            (value) => value && value.size <= 5000000
          ),
      });

      await schemaForImage.validate({ image });

      // Perform image upload logic here
      handleAddCustomLink(event);
    } catch (imageError) {
      setImageError(imageError.message);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(false);

  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector((state) => state.users);
  const { success } = useSelector((state) => state.profile);
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push("/login");
      } else {
        if (success) {
          setShowAddVideo(false);
          dispatch({ type: PROFILE_RESET });
        } else {
          dispatch(getUser(authUser.username));
        }
      }
    }
  }, [history, authUser, dispatch, rehydrated, success]);
  const { tag, success: tagSuccess } = useSelector((state) => state.tags);
  const [videoURL, setVideoURL] = useState("");

  const [customLink, setCustomLink] = useState({ title: "", url: "" });
  const handleClose1 = () => {
    dispatch({ type: TAG_RESET });
  };
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

  const handleDirectOn = (id) => {
    dispatch(updateProfile(profile.id, { direct: id }));
  };

  const handlePrivateChange = (event) => {
    event.preventDefault();
    dispatch(
      updateProfile(profile.id, { isPrivate: !(profile.isPrivate || false) })
    );
  };

  function toggleChanged(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  const deleteVideo = (video) => {
    let videos = profile.videos ?? [];
    videos = videos.filter((e) => e !== video);
    dispatch(updateProfileMedia(profile.id, { videos: videos }));
  };

  const deleteLink = (link) => {
    dispatch(deleteCustomLink(profile.id, link.id));
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
  const handleAddCustomLink = () => {
    dispatch(addCustomLink(profile.id, customLink));
    setCustomLink({ title: "", url: "" });
    setShowCustomLink(false);
  };

  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Info Card</title>
          </Helmet>
          {loading && <Loader />}
          <Row>
            <Col md={12}>
              {user ? (
                <Toggle
                  isPersonal={user.isPersonal}
                  toggleChanged={toggleChanged}
                />
              ) : (
                <></>
              )}
            </Col>
          </Row>
          <Row className="">
            <Col className="m-auto" md={5} lg={4}>
              <div className="mt-2">
                {error && <Message variant="danger">{error}</Message>}
                {profile ? (
                  <div className="">
                    <Row className="">
                      <Col xs={12} className="">
                        <Row
                          className="user-card"
                          style={{
                            backgroundColor: profile.color ?? "grey",
                          }}
                        >
                          <Col
                            xs={6}
                            lg={6}
                            className="p-0"
                            id="image-adjustment"
                          >
                            {profile.image && profile.image !== "" ? (
                              <img
                                src={
                                  process.env.REACT_APP_IMAGE_URL +
                                  profile.image
                                }
                                alt=""
                                className="img-fluid image-adjust"
                              />
                            ) : (
                              <img
                                src={process.env.PUBLIC_URL + "/user.png"}
                                alt=""
                                className="img-fluid"
                                style={{
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </Col>

                          <Col xs={6} lg={6}>
                            <h5>{profile.name}</h5>
                            <h5 id="company-name-length-adjust">
                              {profile.company}
                            </h5>
                            <h6>{profile.jobTitle}</h6>
                            <p>
                              <strong>Views: </strong>
                              {profile.views}
                              <br />
                              <strong>Info Shared: </strong>
                              {profile.infoShared}
                            </p>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xs={6}>
                            <Button
                              type="submit"
                              variant="outline-primary"
                              style={{
                                width: "100%",
                              }}
                              onClick={(e) => setShowCustomLink(true)}
                            >
                              Add links
                            </Button>
                          </Col>
                          <Col xs={6}>
                            <Button
                              type="submit"
                              style={{
                                backgroundColor: profile.color ?? "black",
                                color: "white",
                                width: "100%",
                                border: `2px solid ${profile.color ?? "black"}`,
                              }}
                              onClick={(e) => setShowAddVideo(true)}
                            >
                              {strings["upload video"]}
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      <>
                        <h5 style={{ paddingTop: "20px" }}>About</h5>
                        <Col xs={12}>{profile.bio}</Col>
                      </>
                      {profile.customLinks && profile.customLinks.length > 0 ? (
                        <>
                          <h5 style={{ paddingTop: "10px" }}>Links</h5>
                          <Col xs={12}>
                            <Slider {...settings}></Slider>
                            <div className="scrolling-wrapper bg-transparent">
                              {profile.customLinks.map((link) => {
                                return (
                                  <div
                                    className="platform-card p-3 m-2"
                                    style={{
                                      display: "inline-block",
                                      width: "290px",
                                      height: "90px",
                                    }}
                                    key={link.id}
                                  >
                                    <div className="d-flex align-items-start justify-content-between">
                                      <div className="d-flex align-items-start">
                                        {link.image ? (
                                          <img
                                            src={
                                              process.env.REACT_APP_IMAGE_URL +
                                              link.image
                                            }
                                            alt=""
                                            className="platform-image"
                                          />
                                        ) : (
                                          <img
                                            src="userphoto.png"
                                            alt=""
                                            className="platform-image"
                                          />
                                        )}
                                        {/* <img
                                          src={
                                            process.env.REACT_APP_IMAGE_URL +
                                            link.image
                                          }
                                          alt=""
                                          className="platform-image"
                                        /> */}
                                        <div>
                                          <div className="d-flex justify-content-between align-items-start">
                                            <h6>{link.title}</h6>
                                          </div>

                                          <span
                                            className="max-lines"
                                            style={{ width: "100%" }}
                                          >
                                            {link.url}
                                          </span>
                                        </div>
                                      </div>
                                      <FontAwesomeIcon
                                        icon={faTrash}
                                        size="1x"
                                        className="delete-video"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          deleteLink(link);
                                        }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </Col>
                        </>
                      ) : (
                        <></>
                      )}

                      <h5 style={{ paddingTop: "10px" }}>Videos</h5>
                      <Col xs={12}>
                        <div className="scrolling-wrapper text-center ">
                          {profile.videos.map((video) => {
                            return (
                              <div
                                style={{
                                  display: "inline-block",
                                }}
                                className="mr-1"
                                key={video}
                              >
                                <div className="text-right mr-2" style={{}}>
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    size="1x"
                                    className="delete-video"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      deleteVideo(video);
                                    }}
                                  />
                                </div>
                                <VideoPlayer video={video} />
                              </div>
                            );
                          })}
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="d-flex flex-row justify-content-between">
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitches"
                              value="off"
                              checked={
                                user.direct !== "" && user.direct !== undefined
                              }
                              onChange={() => {
                                const link = profile.platforms[0];
                                if (
                                  (user.direct === "" ||
                                    user.direct === undefined) &&
                                  link
                                ) {
                                  handleDirectOn(link.id);
                                } else {
                                  handleDirectOn("");
                                }
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitches"
                            >
                              {strings["Direct"]}
                            </label>
                          </div>
                          <div className="custom-control custom-switch">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id="customSwitches1"
                              value="off"
                              checked={profile.isPrivate}
                              onChange={handlePrivateChange}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customSwitches1"
                            >
                              {strings["Private"]}
                            </label>
                          </div>
                        </div>
                      </Col>
                      <h5 style={{ paddingTop: "10px" }}>Platforms</h5>
                      <Col xs={12}>
                        <Row className="g-2">
                          {profile.platforms.map((platform, key) => {
                            return (
                              <Col key={key} xs={12}>
                                <HomePlatform
                                  platform={platform}
                                  showMakeDirect={platform.id !== user.direct}
                                  handleDirectOn={handleDirectOn}
                                />
                              </Col>
                            );
                          })}
                        </Row>
                      </Col>
                    </Row>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
          </Row>
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
              <Form onSubmit={handleSubmit(handleSubmitForLink)}>
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
                      handleImageChange(event);

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
                {imageError && <p>{imageError}</p>}
                <p>{errors.filename?.message}</p>
                <Button type="submit" variant="primary">
                  {strings["ADD"]}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Fragment>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};
export default multilanguage(HomePage);
