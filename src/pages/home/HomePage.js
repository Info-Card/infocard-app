import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { getUser } from 'state/ducks/users/actions';
import {
  addCustomLink,
  deleteCustomLink,
  updateProfile,
  updateVideos,
} from 'state/ducks/profile/actions';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import Message from 'components/Message';
import { activateTag } from 'state/ducks/tags/actions';
import { TAG_RESET } from 'state/ducks/tags/types';
import { LOGOUT } from 'state/ducks/auth/types';
import HomePlatform from './components/HomePlatform';
import Toggle from 'components/Toggle';
import VideoPlayer from './components/VideoPlayer';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { multilanguage } from 'redux-multilanguage';
import { PROFILE_RESET } from 'state/ducks/profile/types';
import Loader from 'components/Loader';
import { deleteLink } from 'state/ducks/links/actions';

const HomePage = ({ history, strings }) => {
  const [showAddVideo, setShowAddVideo] = useState(false);
  const [showCustomLink, setShowCustomLink] = useState(false);
  const [videoURL, setVideoURL] = useState('');

  const [customLink, setCustomLink] = useState({ title: '', url: '' });

  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector((state) => state.users);
  const { success } = useSelector((state) => state.profile);
  const { tag, success: tagSuccess } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push('/login');
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

  const handleAddVideo = (event) => {
    event.preventDefault();
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

  const deleteLink = (link) => {
    dispatch(deleteCustomLink(profile.id, link.id));
  };

  const handleAddCustomLink = (event) => {
    event.preventDefault();
    dispatch(addCustomLink(profile.id, customLink));
    setCustomLink({ title: '', url: '' });
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
            <Col md={4} />
            <Col md={4}>
              <div className="mt-2">
                {error && <Message variant="danger">{error}</Message>}
                {profile ? (
                  <div className="">
                    <Row className="g-2">
                      <Col xs={12}>
                        <div className="profile-card">
                          <div
                            className="profile-card-bg"
                            style={{ backgroundColor: profile.color ?? 'grey' }}
                          ></div>
                          <div>
                            {profile.image && profile.image !== '' ? (
                              <img
                                src={
                                  process.env.REACT_APP_API_URL + profile.image
                                }
                                alt=""
                                className="twPc-avatarLink twPc-avatarImg"
                              />
                            ) : (
                              <img
                                src={process.env.PUBLIC_URL + '/user.png'}
                                alt=""
                                className="twPc-avatarLink twPc-avatarImg"
                              />
                            )}
                            <div className="twPc-divUser">
                              <div className="twPc-divName">{profile.name}</div>
                              <span>
                                @<span>{user.username}</span>
                              </span>
                            </div>
                          </div>
                          <div className="twPc-divStats">
                            <strong>{strings['About:']}</strong>
                            <p>{profile.bio}</p>
                            <div className="d-flex justify-content-around">
                              <p>
                                <strong>Views: </strong>
                                {profile.views}
                              </p>
                              <p>
                                <strong>Info Shared: </strong>
                                {profile.infoShared}
                              </p>
                            </div>

                            <ul className="twPc-Arrange text-center">
                              <li className="twPc-ArrangeSizeFit">
                                <Button
                                  type="submit"
                                  variant=""
                                  onClick={(e) => setShowCustomLink(true)}
                                >
                                  Add links
                                </Button>
                              </li>
                              <li className="twPc-ArrangeSizeFit">
                                <Button
                                  type="submit"
                                  variant=""
                                  onClick={(e) => setShowAddVideo(true)}
                                >
                                  {strings['upload video']}
                                </Button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                      {profile.customLinks && profile.customLinks.length > 0 ? (
                        <>
                          <h5 style={{ paddingTop: '10px' }}>Links</h5>
                          <Col xs={12}>
                            <div className="scrolling-wrapper bg-transparent">
                              {profile.customLinks.map((link) => {
                                return (
                                  <div
                                    className="platform-card p-3 m-2"
                                    style={{
                                      display: 'inline-block',
                                      width: '290px',
                                      height: '90px',
                                    }}
                                  >
                                    <div className="d-flex align-items-start justify-content-between">
                                      <div className="d-flex align-items-start">
                                        <img
                                          src={
                                            process.env.REACT_APP_API_URL +
                                            link.image
                                          }
                                          alt=""
                                          className="platform-image"
                                        />
                                        <div>
                                          <div class="d-flex justify-content-between align-items-start">
                                            <h6>{link.title}</h6>
                                          </div>

                                          <span
                                            className="max-lines"
                                            style={{ width: '100%' }}
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

                      <h5 style={{ paddingTop: '10px' }}>Videos</h5>
                      <Col xs={12}>
                        <div className="scrolling-wrapper text-center ">
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
                        <div className="d-flex flex-row justify-content-between">
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
                                  (user.direct === '' ||
                                    user.direct === undefined) &&
                                  link
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
                              {strings['Direct']}
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
                              {strings['Private']}
                            </label>
                          </div>
                        </div>
                      </Col>
                      <h5 style={{ paddingTop: '10px' }}>Platforms</h5>
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
              <Modal.Title>{strings['Activate your product']}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {
                  strings[
                    'If you want to link it with current account please select'
                  ]
                }{' '}
                <span>
                  <strong>
                    "{strings['Activate to']} {authUser.username}"
                  </strong>
                </span>{' '}
                {
                  strings[
                    "or If you want to link it with different account please select 'Switch Account'"
                  ]
                }
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleSwitch}>
                {strings['Switch Account']}
              </Button>
              {authUser && (
                <Button variant="primary" onClick={handleActivate}>
                  {strings['Activate to']} {authUser.username}
                </Button>
              )}
            </Modal.Footer>
          </Modal>
          <Modal show={tagSuccess}>
            <Modal.Header closeButton>
              <Modal.Title>{strings['Activation Completed']}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {strings['You have successfully activated Info Card']}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose1}>
                {strings['Close']}
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={showAddVideo}>
            <Modal.Header closeButton onHide={(e) => setShowAddVideo(false)}>
              <Modal.Title>{strings['Add Youtube Video']}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddVideo}>
                <Form.Group controlId="name">
                  <Form.Label>{strings['URL']}</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter url"
                    value={videoURL}
                    onChange={(e) => setVideoURL(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  {strings['ADD']}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal show={showCustomLink}>
            <Modal.Header closeButton onHide={(e) => setShowCustomLink(false)}>
              <Modal.Title>Add Custom Link</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddCustomLink}>
                <Form.Group controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    value={customLink.title}
                    onChange={(e) =>
                      setCustomLink({ ...customLink, title: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="name">
                  <Form.Label>{strings['URL']}</Form.Label>
                  <Form.Control
                    type="url"
                    placeholder="Enter url"
                    value={customLink.url}
                    onChange={(e) =>
                      setCustomLink({ ...customLink, url: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    placeholder="Choose image"
                    // value={customLink.image}
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
                  {strings['ADD']}
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
