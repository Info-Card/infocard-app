import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { getUser } from 'state/ducks/users/actions';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import Message from 'components/Message';
import Platform from 'components/Platform';
import { getTag, activateTag } from 'state/ducks/tags/actions';
import { TAG_RESET } from 'state/ducks/tags/types';

const HomePage = ({ history }) => {
  const tagId = localStorage.getItem('tagId')
    ? JSON.parse(localStorage.getItem('tagId'))
    : null;

  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile } = useSelector((state) => state.users);
  const { tag, success } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push('/login');
      } else {
        if (tagId) {
          dispatch(getTag(tagId));
        }
        dispatch(getUser(authUser.username));
      }
    }
  }, [history, authUser, dispatch, tagId, rehydrated]);
  const handleClose = () => {
    localStorage.removeItem('tagId');
    dispatch({ type: TAG_RESET });
  };

  const handleActivate = () => {
    dispatch(activateTag(tagId));
    // handleClose();
  };
  const handleClose1 = () => {
    dispatch({ type: TAG_RESET });
  };

  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{authUser.username} - Info Card</title>
          </Helmet>
          {tag ? tagId : ''}
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

                    <Row>
                      {profile.platforms.map((platform, key) => {
                        return (
                          <Col key={key} xs={4}>
                            <a
                              href={platform.webBaseURL + platform.value}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <Platform platform={platform} />
                            </a>
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
            <Modal.Header closeButton>
              <Modal.Title>Activation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              You were trying to activate Info Card, If you want to link it with
              current account please sellect activate.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleActivate}>
                Activate
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal show={success}>
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
        </Fragment>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};

export default HomePage;
