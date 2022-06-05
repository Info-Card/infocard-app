import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Col, Container, Row } from 'react-bootstrap';
import Message from 'components/Message';
import Platform from 'components/Platform';
import { getProfile } from 'state/ducks/profile/actions';

const ProfilePage = ({ history, match }) => {
  const username = match.params.username;
  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user } = useSelector((state) => state.profile);

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      localStorage.setItem('tagId', JSON.stringify(username));
      history.push('/login');
    } else {
      dispatch(getProfile(username, authUser));
    }
  }, [history, authUser, dispatch, username, error]);

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
                  <p>@{user ? user.username : ''}</p>
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
      </Fragment>
    </Container>
  );
};

export default ProfilePage;
