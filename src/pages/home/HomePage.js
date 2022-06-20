import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { getUser, updateProfile } from 'state/ducks/users/actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Message from 'components/Message';
import { activateTag } from 'state/ducks/tags/actions';
import { TAG_RESET } from 'state/ducks/tags/types';
import { LOGOUT } from 'state/ducks/auth/types';
import HomePlatform from './components/HomePlatform';
import Toggle from 'components/Toggle';
import { USER_RESET } from 'state/ducks/users/types';
import VideoPlayer from './components/VideoPlayer';

const HomePage = ({ history }) => {
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [videoURL, setVideoURL] = useState('');

  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, success } = useSelector((state) => state.users);
  const { tag, success: tagSuccess } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push('/login');
      } else {
        if (success) {
          dispatch({ type: USER_RESET });
        } else {
          dispatch(getUser(authUser.username));
        }
      }
    }
  }, [history, authUser, dispatch, rehydrated, success]);
  const handleClose = () => {
    localStorage.removeItem('tagId');
    dispatch({ type: TAG_RESET });
  };

  const handleSwitch = () => {
    dispatch({ type: LOGOUT });
    history.push('/register');
  };

  const handleActivate = () => {
    dispatch(activateTag(tag.id));
  };
  const handleClose1 = () => {
    dispatch({ type: TAG_RESET });
  };

  const handleDirectOn = (id) => {
    dispatch(updateProfile(profile.id, { direct: id }));
  };

  function toggleChanged(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  const handleAddVideo = (event) => {
    dispatch(updateProfile(profile.id, { videos: [videoURL] }));
    setVideoURL('');
  };

  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{authUser.username} - Info Card</title>
          </Helmet>
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
            <Col md={4} />
            <Col md={4}>
              <div className="text-center">
                {error ? <Message variant="danger">{error}</Message> : <></>}
                {profile ? (
                  <div className="">
                    {profile.image && profile.image !== '' ? (
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
                    <p>@{authUser.username ?? ''}</p>
                    <h4>{profile.name ?? ''}</h4>
                    <p>{profile.bio ?? ''}</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <p>taps: {profile.taps}</p>&nbsp;&nbsp;&nbsp;
                      <p>views: {profile.views}</p>
                    </div>
                    <Row>
                      <Col xs={12}>
                        <Button
                          type="submit"
                          variant="primary"
                          className="mb-2"
                          onClick={(e) => setShowAddVideo(true)}
                        >
                          Upload Video
                        </Button>
                        {profile.videos &&
                          profile.videos.map((video, key) => {
                            return (
                              <Col key={key} xs={12}>
                                <VideoPlayer video={video} />
                              </Col>
                            );
                          })}
                        {/* <Col xs={12}>
                          <VideoPlayer video="https://www.youtube.com/watch?v=nNZvaMoiATE" />
                        </Col> */}
                      </Col>
                    </Row>
                    <div className="d-flex flex-row">
                      <div className="custom-control custom-switch">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="customSwitches"
                          value="off"
                          checked={
                            user.direct !== '' && user.direct !== undefined
                          }
                          onChange={() => {
                            const link = profile.platforms[0];
                            if (
                              user.direct === '' ||
                              user.direct === undefined
                            ) {
                              handleDirectOn(link.id);
                            } else {
                              handleDirectOn('');
                            }
                          }}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor="customSwitches"
                        >
                          Direct On
                        </label>
                      </div>
                    </div>
                    <Row>
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
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
            <Col md={4} />
          </Row>
          <Modal show={tag}>
            <Modal.Header closeButton onHide={handleClose}>
              <Modal.Title>Activate your product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                If you want to link it with current account please select{' '}
                <span>
                  <strong>"Activate to {authUser.username}"</strong>
                </span>{' '}
                or If you want to link it with different account please select
                "Switch Account"
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSwitch}>
                Switch Account
              </Button>
              {authUser && (
                <Button variant="primary" onClick={handleActivate}>
                  Activate to {authUser.username}
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          <Modal show={tagSuccess}>
            <Modal.Header closeButton>
              <Modal.Title>Activation Completed</Modal.Title>
            </Modal.Header>
            <Modal.Body>You have successfully activated Info Card</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showAddVideo}>
            <Modal.Header closeButton onHide={(e) => setShowAddVideo(false)}>
              <Modal.Title>Add Youtube Video</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddVideo}>
                <Form.Group controlId="name">
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter url"
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  ADD
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

export default HomePage;
