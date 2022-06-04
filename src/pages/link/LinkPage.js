import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { GET_LINK_SUCCESS, LINK_RESET } from 'state/ducks/links/types';
import { Button, Col, Form, Row } from 'react-bootstrap';
import Message from 'components/Message';
import Loader from 'components/Loader';
import { createLink, deleteLink, updateLink } from 'state/ducks/links/actions';

const LinkPage = ({ history, match }) => {
  const linkId = match.params.linkId;

  const [path, setPath] = useState('');

  const { user: authUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);
  const { categories, link, error, loading, success } = useSelector(
    (state) => state.links
  );
  const { rehydrated } = useSelector((state) => state._persist);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    } else if (rehydrated) {
      if (success) {
        dispatch({ type: LINK_RESET });
        history.push(`/profile`);
      } else if (!link) {
        dispatch({ type: GET_LINK_SUCCESS, payload: linkId });
      } else if (link) {
        setPath(link.value);
      }
    }
  }, [
    history,
    authUser,
    linkId,
    link,
    categories,
    dispatch,
    rehydrated,
    success,
  ]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (link.id) {
      dispatch(updateLink(link.id, { value: path }));
    } else {
      dispatch(
        createLink({
          platform: link.platform,
          value: path,
          profile: profile.id,
        })
      );
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteLink(link.id));
  };

  return (
    <MainLayout>
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
              {link ? (
                <div className="">
                  {link.image && link.image !== '' ? (
                    <img
                      src={process.env.REACT_APP_API_URL + link.image}
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

                  <h4>{link.title ?? ''}</h4>
                  <p>{link.headline ?? ''}</p>

                  <Form onSubmit={submitHandler}>
                    <Form.Group controlId="value">
                      <Form.Control
                        type="text"
                        placeholder=""
                        value={path}
                        onChange={(e) => setPath(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    {loading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Button type="submit" variant="primary">
                          {link.id ? 'Update' : 'Save'}
                        </Button>
                        {link.id ? (
                          <Button
                            type=""
                            variant="danger"
                            style={{ marginLeft: '10px' }}
                            onClick={handleDeleteClick}
                          >
                            Delete
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </Form>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Col>
          <Col md={4} />
        </Row>
      </Fragment>
    </MainLayout>
  );
};

export default LinkPage;
