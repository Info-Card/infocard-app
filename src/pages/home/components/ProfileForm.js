import React, { useState, useEffect, useRef } from 'react';
import { CirclePicker } from 'react-color';
import { Form, Button, Row, Col, Modal, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, updateProfileMedia } from 'state/ducks/profile/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { multilanguage } from 'redux-multilanguage';
import { PROFILE_RESET } from 'state/ducks/profile/types';
import { getUser } from 'state/ducks/users/actions';

const ProfileForm = ({ strings }) => {
  const [showImageOptions, setShowImageOptions] = useState(false);
  const inputFile = useRef(null);

  const [form, setForm] = useState({
    name: '',
    bio: '',
    address: '',
    dateOfBirth: '',
    color: '',
    jobTitle: '',
    company: '',
    image: '',
  });
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const { user: authUser } = useSelector((state) => state.auth);
  const { profile, error } = useSelector((state) => state.users);
  const {
    success,
    loading,
    error: profileError,
  } = useSelector((state) => state.profile);

  useEffect(() => {
    if (authUser) {
      if (success) {
        dispatch({ type: PROFILE_RESET });
        dispatch(getUser(authUser.username));
      } else if (profile) {
        setForm({
          name: profile.name ?? '',
          bio: profile.bio ?? '',
          address: profile.address ?? '',
          dateOfBirth: profile.dateOfBirth ?? '',
          color: profile.color ?? '',
          company: profile.company ?? '',
          jobTitle: profile.jobTitle ?? '',
        });
      }
    }
  }, [dispatch, success, profile, authUser]);

  function selectImage() {
    setShowImageOptions(false);
    inputFile.current.click();
  }
  function deleteImage() {
    setShowImageOptions(false);
    dispatch(updateProfileMedia(profile.id, { image: '' }));
  }

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
    e.preventDefault();
    dispatch(updateProfile(profile.id, form));
  };

  return (
    <div className="profile-card">
      <div className="text-center">
        <Row>
          <Col>
            <div class="profile_header">
              <div
                class="profile_cover"
                style={{ backgroundColor: form.color }}
              >
                <div></div>
              </div>

              <div class="profile_photo">
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: 'none' }}
                  onChange={onImageChange}
                />
                <FontAwesomeIcon
                  icon={faPen}
                  size="1x"
                  className="edit-profile-image"
                  onClick={(e) => setShowImageOptions(true)}
                />

                {file ? (
                  <img src={file} alt="" />
                ) : (
                  <>
                    {profile && profile.image && profile.image !== '' ? (
                      <img
                        src={process.env.REACT_APP_API_URL + profile.image}
                        alt=""
                      />
                    ) : (
                      <img src={process.env.PUBLIC_URL + '/user.png'} alt="" />
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
        <Message variant="success">{strings['Profile Updated']}</Message>
      )}
      {!profile ? (
        <></>
      ) : (
        <Form onSubmit={submitHandler} key={profile.id} className="p-2">
          <Form.Group controlId="name">
            <Form.Label>{strings['Name']}</Form.Label>
            <Form.Control
              type="name"
              placeholder={strings['Enter name']}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="bio">
            <Form.Label>{strings['Bio']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter bio']}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            ></Form.Control>
          </Form.Group>
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
            <Form.Label>{strings['Address']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter Address']}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="jobTitle">
            <Form.Label>{strings['Job Title']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter Job Title']}
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="color">
            <Form.Label>{strings['Color']}</Form.Label>
            <CirclePicker
              className="mb-2"
              colors={[
                '#81D8D0',
                '#F5F5DC',
                '#F7E7CE',
                '#000000',
                '#FDD7E4',
                '#F70D1A',
                '#E6E6FA',
                '#BAB86C',
              ]}
              onChangeComplete={(color, event) => {
                const { hex } = color;
                setForm({ ...form, color: hex });
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="">
            {loading ? <Loader /> : strings['Update']}
          </Button>
        </Form>
      )}
      <Modal show={showImageOptions} size="sm">
        <Modal.Header closeButton onHide={(e) => setShowImageOptions(false)}>
          <Modal.Title>Choose Option</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={selectImage}>
              Edit
            </Button>
            <Button variant="outline-danger" onClick={deleteImage}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default multilanguage(ProfileForm);
