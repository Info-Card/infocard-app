import React, { useState, useEffect, useRef } from 'react';
import { CirclePicker } from 'react-color';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { USER_RESET } from 'state/ducks/users/types';
import { updateProfile } from 'state/ducks/users/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import Message from 'components/Message';
import Loader from 'components/Loader';

const ProfileForm = () => {
  const inputFile = useRef(null);

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [color, setColor] = useState('gray');

  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);

  const dispatch = useDispatch();

  const { success, loading, profile, error } = useSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_RESET });
    } else if (profile) {
      setName(profile.name ?? '');
      setBio(profile.bio ?? '');
      setAddress(profile.address ?? '');
      setColor(profile.color ?? 'grey');
    }
  }, [dispatch, success, profile]);

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
    dispatch(updateProfile(profile.id, { name, bio, address, image, color }));
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
      {error && <Message variant="danger">{error}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {!profile ? (
        <></>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler} key={profile.id} className="p-2">
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="bio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="bio">
            <Form.Label>Color</Form.Label>
            <CirclePicker
              className="mb-2"
              colors={['#D9E3F0', '#F47373', '#697689', '#37D67A', '#2CCCE4']}
              onChangeComplete={(color, event) => {
                const { hex } = color;
                setColor(hex);
              }}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="">
            {loading ? <Loader /> : 'Update'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProfileForm;
