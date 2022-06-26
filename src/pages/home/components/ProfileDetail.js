import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Platform from 'components/Platform';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { getLink } from 'state/ducks/links/actions';
import VideoPlayer from './VideoPlayer';

const ProfileDetail = ({ user, profile }) => {
  const [showExchange, setShowExchange] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (
        user.direct !== '' &&
        user.direct !== undefined &&
        user.personal &&
        user.business
      ) {
        const platforms = user.personal.platforms.concat(
          user.business.platforms
        );
        platforms.forEach((platform) => {
          if (platform.id === user.direct) {
            dispatch(getLink(platform.id));
            var urlString =
              platform.type === 'url' && !platform.value.startsWith('http')
                ? 'https://' + platform.value
                : platform.webBaseURL + platform.value;
            if (platform.type === 'medical') {
              urlString = platform.webBaseURL + platform.id;
            }
            window.open(urlString, '_self');
          }
        });
      }
    }
  }, [user, dispatch]);

  const getURL = (platform) => {
    dispatch(getLink(platform.id));
    var urlString =
      platform.type === 'url' && !platform.value.startsWith('http')
        ? 'https://' + platform.value
        : platform.webBaseURL + platform.value;
    if (platform.type === 'medical') {
      urlString = platform.webBaseURL + platform.id;
    }
    return urlString;
  };

  const handleExchange = (event) => {
    event.preventDefault();
    console.log(form);
    setForm({ name: '', email: '', message: '' });
    setShowExchange(false);
  };

  return (
    <>
      {profile && user && (user.direct === '' || user.direct === undefined) ? (
        <div className="mt-1">
          <Row className="g-2">
            <Col xs={12} className="">
              <div class="profile-card">
                <div
                  class="profile-card-bg"
                  style={{ backgroundColor: profile.color ?? 'grey' }}
                ></div>
                <div>
                  {profile.image && profile.image !== '' ? (
                    <img
                      src={process.env.REACT_APP_API_URL + profile.image}
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
                      <a
                        href={`https://api.infocard.me/v1/profile/contact/${profile.id}`}
                      >
                        <Button
                          type="submit"
                          variant="primary"
                          style={{ width: '90%', marginRight: '2px' }}
                        >
                          Save Contact
                        </Button>
                      </a>
                    </li>
                    <li class="twPc-ArrangeSizeFit">
                      <Button
                        type="submit"
                        variant=""
                        style={{
                          backgroundColor: profile.color ?? 'grey',
                          width: '92%',
                          color: 'white',
                        }}
                        onClick={(e) => {
                          setShowExchange(true);
                        }}
                      >
                        Exchange
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
                    <div style={{ display: 'inline-block' }}>
                      <VideoPlayer video={video} />
                    </div>
                  );
                })}
              </div>
            </Col>
            <Col xs={12}>
              <div className="platform-card p-3">
                <Row>
                  {profile.platforms.map((platform, key) => {
                    return (
                      <Col key={key} xs={3}>
                        <a
                          href={getURL(platform)}
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
            </Col>
          </Row>
          <Modal show={showExchange}>
            <Modal.Header closeButton onHide={(e) => setShowExchange(false)}>
              <Modal.Title>Exchange Contact with {profile.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleExchange}>
                <Form.Group controlId="name">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Enter name"
                    value={form.name}
                    required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  ></Form.Control>
                  <Form.Label>Your Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={form.email}
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  ></Form.Control>
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter message"
                    value={form.message}
                    required
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  Exchange
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ProfileDetail;
