import React, { useState, useEffect, useRef } from "react";
import { CirclePicker } from "react-color";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "state/ducks/profile/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Message from "components/Message";
import Loader from "components/Loader";
import { multilanguage } from "redux-multilanguage";
import { PROFILE_RESET } from "state/ducks/profile/types";
import { getUser } from "state/ducks/users/actions";
import ProfileFormModal from "./ProfileFormModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
const schema = yup.object().shape({
  name: yup.string().max(23).required(),
  bio: yup.string().required().min(5).max(100),
  address: yup.string().min(6).max(25).required(),
  company: yup.string().min(5).max(23).required(),
  title: yup.string().min(6).max(13),
  color: yup.string(),
});
const ProfileForm = ({ strings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [showImageOptions, setShowImageOptions] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [showImage, setShowImage] = useState(false);
  const handleImageClick = (url) => {
    console.log(url);
    setImageUrl(url);
    setShowImage(true);
  };

  const inputFile = useRef(null);

  const [form, setForm] = useState({
    name: "",
    bio: "",
    address: "",
    dateOfBirth: "",
    color: "",
    jobTitle: "",
    company: "",
    image: "",
  });
  const [file, setFile] = useState(null);
  const imageStyle = {
    width: "450px",
    height: "550px",
  };

  const dispatch = useDispatch();

  const { user: authUser } = useSelector((state) => state.auth);
  const { profile, error } = useSelector((state) => state.users);
  const {
    success,
    loading,
    error: profileError,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    setShowImageOptions(false);
    if (authUser) {
      if (success) {
        dispatch({ type: PROFILE_RESET });
        dispatch(getUser(authUser.username));
      } else if (profile) {
        setForm({
          name: profile.name ?? "",
          bio: profile.bio ?? "",
          address: profile.address ?? "",
          dateOfBirth: profile.dateOfBirth ?? "",
          color: profile.color ?? "",
          company: profile.company ?? "",
          jobTitle: profile.jobTitle ?? "",
        });
      }
    }
  }, [dispatch, success, profile, authUser]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setForm({ ...form, image: event.target.files });
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submitHandler = (e) => {
    dispatch(updateProfile(profile.id, form));
  };

  return (
    <div className=" profile-card">
      <div className="text-center">
        <Row>
          <Col>
            <div className="profile_header">
              <div
                className="profile_cover"
                style={{ backgroundColor: form.color }}
              >
                <div></div>
              </div>

              <div
                style={{ position: "relative", display: "inline-block" }}
                className="profile_photo"
              >
                <input
                  type="file"
                  id="file"
                  accept="image/png, image/jpg, image/jpeg"
                  ref={inputFile}
                  style={{ display: "none" }}
                  onChange={onImageChange}
                />
                <FontAwesomeIcon
                  style={{ marginRight: "-5px" }}
                  icon={faPen}
                  size="1x"
                  className="edit-profile-image"
                  onClick={(e) => setShowImageOptions(true)}
                />

                {file ? (
                  <img src={file} alt="" />
                ) : (
                  <>
                    {profile && profile.image && profile.image !== "" ? (
                      <img
                        src={process.env.REACT_APP_IMAGE_URL + profile.image}
                        alt=""
                        onClick={() => handleImageClick(profile.image)}
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + "/user.png"} alt="" />
                    )}
                  </>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
      {error || profileError ? (
        <Message variant="danger">{error ? error : profileError}</Message>
      ) : (
        <></>
      )}
      {success && (
        <Message variant="success">{strings["Profile Updated"]}</Message>
      )}
      {!profile ? (
        <></>
      ) : (
        <Form
          onSubmit={handleSubmit(submitHandler)}
          key={profile.id}
          className="p-2"
        >
          <Form.Group controlId="name">
            <Form.Label>{strings["Name"]}</Form.Label>
            <Form.Control
              {...register("name")}
              type="name"
              placeholder={strings["Enter name"]}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <p>{errors.name?.message}</p>
          <Form.Group controlId="bio">
            <Form.Label>{strings["Bio"]}</Form.Label>
            <textarea
              {...register("bio")}
              rows="3"
              type="text"
              placeholder={strings["Enter bio"]}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              className="form-control"
            ></textarea>
          </Form.Group>
          <p>{errors.bio?.message}</p>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={form.dateOfBirth}
              onChange={(e) =>
                setForm({ ...form, dateOfBirth: e.target.value })
              }
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>{strings["Address"]}</Form.Label>
            <Form.Control
              {...register("address")}
              type="text"
              placeholder={strings["Enter Address"]}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <p>{errors.address?.message}</p>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              {...register("company")}
              type="text"
              placeholder="Enter Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <p>{errors.company?.message}</p>
          <Form.Group controlId="jobTitle">
            <Form.Label>{strings["Job Title"]}</Form.Label>
            <Form.Control
              {...register("title")}
              type="text"
              placeholder={strings["Enter Job Title"]}
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <p>{errors.title?.message}</p>
          <Form.Group controlId="color">
            <Form.Label>{strings["Color"]}</Form.Label>
            <CirclePicker
              className="mb-2"
              colors={[
                "#81D8D0",
                "#30538C",
                "#03879E",
                "#000000",
                "#FDD7E4",
                "#F70D1A",
                "#F5A2A1",
                "#BAB86C",
              ]}
              {...register("color")}
              onChangeComplete={(color, event) => {
                const { hex } = color;
                setForm({ ...form, color: hex });
              }}
            />
          </Form.Group>
          <p>{errors.color?.message}</p>
          <Button type="submit" variant="primary" className="">
            {loading ? <Loader /> : strings["Update"]}
          </Button>
        </Form>
      )}
      {showImageOptions === true ? <ProfileFormModal /> : null}

      <Modal show={showImage}>
        <Modal.Header closeButton onHide={(e) => setShowImage(false)}>
          <Modal.Title>Profile Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {showImage && (
              <img
                src={process.env.REACT_APP_IMAGE_URL + imageUrl}
                alt="Image"
                style={imageStyle}
              />
            )}
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default multilanguage(ProfileForm);
