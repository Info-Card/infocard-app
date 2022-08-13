import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { getProfile } from 'state/ducks/profile/actions';
import { getTag } from 'state/ducks/tags/actions';
import ProfileDetail from './components/ProfileDetail';
import { Link } from 'react-router-dom';
import Loader from 'components/Loader';
import { multilanguage } from 'redux-multilanguage';

const ProfilePage = ({ history, match, strings }) => {
  const username = match.params.username;
  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector(
    (state) => state.profile
  );
  const { tag, error: tagError } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);

  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (error) {
        if (!tag) {
          if (tagError) {
            history.push('/not-found');
          } else {
            dispatch(getTag(username));
          }
        } else if (authUser) {
          history.push('/');
        }
      } else if (profile && profile.isPrivate) {
        history.push('/not-found');
      } else if (!profile) {
        dispatch(getProfile(username, authUser));
      }
    }
  }, [
    history,
    authUser,
    dispatch,
    username,
    rehydrated,
    error,
    tag,
    tagError,
    profile,
  ]);

  return (
    <Container fluid>
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{user ? user.username : ''} - Vita Code</title>
        </Helmet>
        <Row>
          <Col xs={12} className="bg-dark text-light text-center">
            <a href="https://infocard.me" target="_blank" rel="noreferrer">
              <h3 className="text-light">Get your card</h3>
            </a>
          </Col>
          <Col md={4} />
          <Col md={4}>
            <div className="">
              {loading ? (
                <Loader />
              ) : (
                <ProfileDetail user={user} profile={profile} />
              )}
            </div>
          </Col>
          <Col md={4} />
          <Modal show={tag && !authUser}>
            <Modal.Header closeButton>
              <Modal.Title>{strings['Activate your product']}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                {
                  strings[
                    'To Activate your product you need to login or register first'
                  ]
                }
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Link to={'/login'}>
                <Button variant="primary">{strings['Login']}</Button>
              </Link>
              <Link to={'/register'}>
                <Button variant="info">{strings['Register']}</Button>
              </Link>
            </Modal.Footer>
          </Modal>
        </Row>
      </Fragment>
    </Container>
  );
};

export default multilanguage(ProfilePage);
