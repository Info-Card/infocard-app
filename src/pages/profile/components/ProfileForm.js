import React, { useState, useEffect } from "react";
import { CirclePicker } from "react-color";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "state/ducks/profile/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Message from "components/Message";
import Loader from "components/Loader";
import { multilanguage } from "redux-multilanguage";
import { PROFILE_RESET } from "state/ducks/profile/types";
import { getUser } from "state/ducks/users/actions";
import ImageOptionsModal from "./ImageOptionsModal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ImageViewer from "react-simple-image-viewer";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const schema = yup.object().shape({
  name: yup.string().max(23).required(),
  bio: yup.string().max(100),
  address: yup.string().max(25),
  company: yup.string().max(23),
  jobTitle: yup.string().max(13),
});

const ProfileForm = ({ profile, strings }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [showImageOptions, setShowImageOptions] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [color, setColor] = useState(profile.color);

  const { rehydrated } = useSelector((state) => state._persist);
  const { user: authUser } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.users);
  const {
    success,
    loading,
    error: profileError,
  } = useSelector((state) => state.profile);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: profile.name,
      bio: profile.bio,
      dateOfBirth: profile.dateOfBirth,
      address: profile.address,
      jobTitle: profile.jobTitle,
      company: profile.company,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push("/login");
      } else if (success) {
        dispatch({ type: PROFILE_RESET });
        dispatch(getUser(authUser.username));
      }
    }
  }, [rehydrated, dispatch, success, authUser, history]);

  const onSubmit = (data) => {
    dispatch(updateProfile(profile.id, { ...data, color }));
  };

  return (
    <div className="card">
      <Form onSubmit={handleSubmit(onSubmit)} key={profile.id} className="p-2">
        <div
          className="profile-cover"
          style={{
            backgroundColor: color,
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100px",
              height: "100px",
              margin: "auto",
            }}
          >
            <img
              src={
                profile.image && profile.image !== ""
                  ? process.env.REACT_APP_IMAGE_URL + profile.image
                  : `${process.env.PUBLIC_URL}/assets/images/placeholder/user.png`
              }
              className="profile-image rounded-circle"
              alt=""
              onClick={() => {
                if (profile.image && profile.image !== "") setShowImage(true);
              }}
            />
            <div
              className="card p-2 rounded-circle"
              style={{ position: "absolute", bottom: 0, right: 0 }}
              onClick={() => {
                setShowImageOptions(true);
              }}
            >
              <FontAwesomeIcon icon={faPen} size="1x" />
            </div>
          </div>
        </div>
        {profileError && (
          <Message variant="danger">{error ? error : profileError}</Message>
        )}
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control {...register("name")} placeholder="" type="text" />
          <p className="text-danger">{errors.name?.message}</p>
        </Form.Group>
        <Form.Group controlId="bio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            {...register("bio")}
            placeholder=""
            as="textarea"
            rows={3}
          />
          <p className="text-danger">{errors.bio?.message}</p>
        </Form.Group>
        <Form.Group controlId="dateOfBirth">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            {...register("dateOfBirth")}
            placeholder=""
            type="date"
          />
          <p className="text-danger">{errors.dateOfBirth?.message}</p>
        </Form.Group>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            {...register("address")}
            placeholder=""
            as="textarea"
            rows={2}
          />
          <p className="text-danger">{errors.address?.message}</p>
        </Form.Group>
        <Form.Group controlId="company">
          <Form.Label>Company</Form.Label>
          <Form.Control {...register("company")} placeholder="" type="text" />
          <p className="text-danger">{errors.company?.message}</p>
        </Form.Group>
        <Form.Group controlId="jobTitle">
          <Form.Label>Job Title</Form.Label>
          <Form.Control {...register("jobTitle")} placeholder="" type="text" />
          <p className="text-danger">{errors.jobTitle?.message}</p>
        </Form.Group>
        <Form.Group controlId="color">
          <Form.Label>Color</Form.Label>
          <CirclePicker
            name="color"
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
            onChangeComplete={(color, event) => {
              const { hex } = color;
              setColor(hex);
              // setForm({ ...form, color: hex });
            }}
          />
        </Form.Group>

        <Button type="submit" variant="primary" className="">
          {loading ? <Loader /> : strings["Update"]}
        </Button>
      </Form>
      <ImageOptionsModal
        show={showImageOptions}
        setShow={setShowImageOptions}
      />
      {showImage && (
        <div className="image-viewer">
          <ImageViewer
            src={[process.env.REACT_APP_IMAGE_URL + profile.image]}
            closeOnClickOutside={true}
            onClose={() => {
              setShowImage(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default multilanguage(ProfileForm);
