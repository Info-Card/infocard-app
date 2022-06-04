import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { getUser } from 'state/ducks/users/actions';
import { Col, Row } from 'react-bootstrap';
import Message from 'components/Message';

const HomePage = ({ history }) => {
  const { user: authUser } = useSelector((state) => state.auth);
  const { user, error, profile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    } else {
      dispatch(getUser(authUser.username));
    }
  }, [history, authUser, user, dispatch]);
  return (
    <MainLayout>
      {authUser ? (
        <Fragment>
          <Helmet>
            <meta charSet="utf-8" />
            <title>{authUser.username} - Info Card</title>
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
                    <p>@{authUser.username ?? ''}</p>
                    <h4>{profile.name ?? ''}</h4>
                    <p>{profile.bio ?? ''}</p>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </Col>
            <Col md={4} />
          </Row>
        </Fragment>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};

export default HomePage;
