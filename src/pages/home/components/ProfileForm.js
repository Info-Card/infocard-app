import React, { useState, useEffect, useRef } from 'react';
import { CirclePicker } from 'react-color';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from 'state/ducks/profile/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { multilanguage } from 'redux-multilanguage';
import { PROFILE_RESET } from 'state/ducks/profile/types';
import { getUser } from 'state/ducks/users/actions';

const ProfileForm = ({ strings }) => {
  const inputFile = useRef(null);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [color, setColor] = useState('');
  const [jobTitle, setJobTitle] = useState('');

  const [image, setImage] = useState(null);
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
        setName(profile.name ?? '');
        setBio(profile.bio ?? '');
        setAddress(profile.address ?? '');
        setDateOfBirth(profile.dateOfBirth ?? '');
        setColor(profile.color ?? '');
        setJobTitle(profile.jobTitle ?? '');
      }
    }
  }, [dispatch, success, profile, authUser]);

  function chooseFile() {
    inputFile.current.click();
  }

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files);
      let reader = new FileReader();
      reader.onload = (e) => {
        setFile(e.target.result);
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProfile(profile.id, {
        name,
        bio,
        address,
        image,
        color,
        dateOfBirth,
        jobTitle,
      })
    );
  };

  return (
    <div className="profile-card">
      <div className="text-center">
        <Row>
          <Col>
            <div class="profile_header">
              <div class="profile_cover" style={{ backgroundColor: color }}>
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
                  onClick={chooseFile}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="bio">
            <Form.Label>{strings['Bio']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter bio']}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date Of Birth</Form.Label>
            <Form.Control
              type="date"
              placeholder="Enter date of birth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="address">
            <Form.Label>{strings['Address']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter Address']}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="jobTitle">
            <Form.Label>{strings['Job Title']}</Form.Label>
            <Form.Control
              type="text"
              placeholder={strings['Enter Job Title']}
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
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
                setColor(hex);
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="">
            {loading ? <Loader /> : strings['Update']}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default multilanguage(ProfileForm);
