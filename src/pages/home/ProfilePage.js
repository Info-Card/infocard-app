import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { getProfile } from 'state/ducks/profile/actions';
import { getTag } from 'state/ducks/tags/actions';
import ProfileDetail from './components/ProfileDetail';
import { Link } from 'react-router-dom';

const ProfilePage = ({ history, match }) => {
  const username = match.params.username;
  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user } = useSelector((state) => state.profile);
  const { tag, error: tagError } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);

  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (error) {
        if (!tag) {
          dispatch(getTag(username));
        } else if (authUser) {
          history.push('/');
        }
      } else {
        dispatch(getProfile(username, authUser));
      }
    }
  }, [history, authUser, dispatch, username, rehydrated, error, tag]);

  return (
    <Container>
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{user ? user.username : ''} - Info Card</title>
        </Helmet>
        <Row>
          <Col md={4} />
          <Col md={4}>
            <div className="text-center">
              {profile ? (
                <ProfileDetail user={user} profile={profile} />
              ) : (
                <>Profile Not found</>
              )}
            </div>
          </Col>
          <Col md={4} />
          <Modal show={tag}>
            <Modal.Header closeButton>
              <Modal.Title>Activate your product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                To Activate your product you need to login or register first
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Link to={'/login'}>
                <Button variant="primary">Login</Button>
              </Link>
              <Link to={'/register'}>
                <Button variant="info">Register</Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </Row>
      </Fragment>
    </Container>
  );
};

export default ProfilePage;
