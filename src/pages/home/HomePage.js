import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import {
  getUser,
  updateProfile,
  updateVideos,
} from 'state/ducks/users/actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import Message from 'components/Message';
import { activateTag } from 'state/ducks/tags/actions';
import { TAG_RESET } from 'state/ducks/tags/types';
import { LOGOUT } from 'state/ducks/auth/types';
import HomePlatform from './components/HomePlatform';
import Toggle from 'components/Toggle';
import { USER_RESET } from 'state/ducks/users/types';
import VideoPlayer from './components/VideoPlayer';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    const videos = profile.videos ?? [];
    videos.push(videoURL);
    dispatch(updateVideos(profile.id, { videos: videos }));
    setVideoURL('');
  };

  const deleteVideo = (video) => {
    let videos = profile.videos ?? [];
    videos = videos.filter((e) => e !== video);
    dispatch(updateVideos(profile.id, { videos: videos }));
  };

  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{authUser.username} - Vita Code</title>
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
          <Row className="">
            <Col md={4} />
            <Col md={4}>
              <div className="mt-2">
                {error ? <Message variant="danger">{error}</Message> : <></>}
                {profile ? (
                  <div className="">
                    <Row className="g-2">
                      <Col xs={12}>
                        <div class="profile-card">
                          <div
                            class="profile-card-bg"
                            style={{ backgroundColor: profile.color ?? 'grey' }}
                          ></div>
                          <div>
                            {profile.image && profile.image !== '' ? (
                              <img
                                src={
                                  process.env.REACT_APP_API_URL + profile.image
                                }
                                alt=""
                                class="twPc-avatarLink twPc-avatarImg"
                              />
                            ) : (
                              <img
                                src={process.env.PUBLIC_URL + '/user.png'}
                                alt=""
                                class="twPc-avatarLink twPc-avatarImg"
                              />
                            )}
                            <div class="twPc-divUser">
                              <div class="twPc-divName">{profile.name}</div>
                              <span>
                                @<span>{user.username}</span>
                              </span>
                            </div>
                          </div>
                          <div class="twPc-divStats">
                            <strong>About:</strong>
                            <p>{profile.bio}</p>
                            <ul class="twPc-Arrange text-center">
                              <li class="twPc-ArrangeSizeFit">
                                <Button type="submit" variant="" disabled>
                                  views: {profile.views}
                                </Button>
                              </li>
                              <li class="twPc-ArrangeSizeFit">
                                <Button
                                  type="submit"
                                  variant=""
                                  onClick={(e) => setShowAddVideo(true)}
                                >
                                  Upload Video
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="scrolling-wrapper">
                          {profile.videos.map((video) => {
                            return (
                              <div
                                style={{
                                  display: 'inline-block',
                                }}
                                className="mr-1"
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
                      </Col>
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
            <Modal.Body>You have successfully activated Vita Code</Modal.Body>
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
