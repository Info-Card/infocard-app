import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Row, Col, Table, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from 'components/Message';
import Loader from 'components/Loader';
import MainLayout from 'components/MainLayout';
import { USER_RESET } from 'state/ducks/users/types';
import { getUser, updateProfile } from 'state/ducks/users/actions';
import { getLinks } from 'state/ducks/links/actions';
import Platform from 'components/Platform';
import { Link } from 'react-router-dom';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Toggle from 'components/Toggle';
import { deleteTag, getTags, updateTag } from 'state/ducks/tags/actions';
import { TAG_RESET } from 'state/ducks/tags/types';

const EditProfilePage = ({ location, history }) => {
  const inputFile = useRef(null);
  const [showDeleteTag, setShowDeleteTag] = useState('');
  const [showUpdateTag, setShowUpdateTag] = useState('');
  const [tagName, setTagName] = useState('');

  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { results: tags, success: tagSuccess } = useSelector(
    (state) => state.tags
  );
  const { user, success, loading, error, profile } = useSelector(
    (state) => state.users
  );
  const { categories } = useSelector((state) => state.links);
  const { rehydrated } = useSelector((state) => state._persist);
  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    } else if (rehydrated) {
      if (success) {
        dispatch({ type: USER_RESET });
      } else if (tagSuccess) {
        dispatch({ type: TAG_RESET });
      } else if (profile) {
        dispatch(getLinks(profile.id));
        dispatch(getTags(authUser.id));
        setName(profile.name ?? '');
        setBio(profile.bio ?? '');
        setAddress(profile.address ?? '');
      } else {
        dispatch(getUser(authUser.username));
      }
    }
  }, [
    dispatch,
    history,
    authUser,
    user,
    success,
    rehydrated,
    profile,
    tagSuccess,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProfile(profile.id, { name, bio, address, image }));
  };

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

  function toggleChanged(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  const handleUpdateTag = (event) => {
    event.preventDefault();
    dispatch(updateTag(showUpdateTag, { name: tagName }));
    setShowUpdateTag('');
  };

  const handleDeleteTag = (event) => {
    event.preventDefault();
    dispatch(deleteTag(showDeleteTag));
    setShowDeleteTag('');
  };

  return (
    <MainLayout>
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
      <Row>
        <Col md={4}>
          <div className="text-center">
            <Row>
              <Col>
                <input
                  type="file"
                  id="file"
                  ref={inputFile}
                  style={{ display: 'none' }}
                  onChange={onImageChange}
                />
                <FontAwesomeIcon
                  icon={faPen}
                  size="2x"
                  className="edit-profile-image"
                  onClick={chooseFile}
                />

                {file ? (
                  <img src={file} alt="" className="profile-image" />
                ) : (
                  <>
                    {profile && profile.image && profile.image !== '' ? (
                      <img
                        src={process.env.REACT_APP_API_URL + profile.image}
                        alt=""
                        className="profile-image"
                      />
                    ) : (
                      <img
                        src={process.env.PUBLIC_URL + '/user.png'}
                        alt=""
                        className="profile-image"
                      />
                    )}
                  </>
                )}
              </Col>
            </Row>
            <p>@{user ? user.username : ''}</p>
          </div>
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated</Message>}
          {loading || !profile ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Form onSubmit={submitHandler} key={profile.id}>
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
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Form>
          )}
        </Col>

        <Col md={8} style={{ paddingTop: '20px' }}>
          {categories ? (
            <>
              {categories.map((category, key) => {
                return (
                  <div className="text-center" key={key}>
                    <h4>{category.name}</h4>

                    <Row>
                      {category.platforms.map((platform, key) => {
                        return (
                          <Col xs={4} md={2} key={key}>
                            <Link to={`/links/${platform.platform}`}>
                              <Platform platform={platform} showCheck={true} />
                            </Link>
                          </Col>
                        );
                      })}
                    </Row>
                    {/* <Platform platform={platform} /> */}
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <div className="mt-5">
            <h4>Linked Cards</h4>
            <Table bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>URL</th>
                  <th></th>
                </tr>
              </thead>
              {tags && (
                <tbody>
                  {tags.map((tag) => (
                    <tr key={tag.id}>
                      <td>{tag.name || tag.id}</td>
                      <td>https://app.infocard.me/{tag.id}</td>

                      <td>
                        <Button
                          className="btn-sm mr-2"
                          variant="primary"
                          onClick={(e) => {
                            setShowUpdateTag(tag.id);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="btn-sm"
                          variant="danger"
                          onClick={(e) => setShowDeleteTag(tag.id)}
                        >
                          UnLink
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </Table>
            <Modal show={showUpdateTag !== ''}>
              <Modal.Header closeButton onHide={(e) => setShowUpdateTag('')}>
                <Modal.Title>Update Tag information</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleUpdateTag}>
                  <Form.Group controlId="name">
                    <Form.Label>Tag Name</Form.Label>
                    <Form.Control
                      type="name"
                      placeholder="Enter name"
                      value={tagName}
                      onChange={(e) => setTagName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Button type="submit" variant="primary">
                    Update
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
            <Modal show={showDeleteTag !== ''}>
              <Modal.Header closeButton onHide={(e) => setShowDeleteTag('')}>
                <Modal.Title>Warning</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to unlink this card?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="submit"
                  variant="danger"
                  onClick={handleDeleteTag}
                >
                  UnLink
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
};

export default EditProfilePage;
