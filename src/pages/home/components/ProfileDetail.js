import React from 'react';
import Platform from 'components/Platform';
import { Col, Row } from 'react-bootstrap';

const ProfileDetail = ({ user, profile }) => {
  return (
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
  );
};

export default ProfileDetail;
