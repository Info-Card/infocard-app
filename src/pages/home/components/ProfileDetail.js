import React, { useEffect } from 'react';
import Platform from 'components/Platform';
import { Col, Row } from 'react-bootstrap';

const ProfileDetail = ({ user, profile }) => {
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
            var urlString =
              platform.type === 'url' && !platform.value.startsWith('http')
                ? 'https://' + platform.value
                : platform.webBaseURL + platform.value;
            window.open(urlString, '_self');
          }
        });
      }
    }
  }, [user]);
  return (
    <>
      {user.direct === '' || user.direct === undefined ? (
        <div className="">
          {profile.image && profile.image !== '' ? (
            <img
              src={process.env.REACT_APP_API_URL + profile.image}
              alt=""
              className="profile-image m-3"
            />
          ) : (
            <img
              src={process.env.PUBLIC_URL + '/user.png'}
              alt=""
              className="profile-image m-3"
            />
          )}
          <h4>{profile.name ?? ''}</h4>
          <p>@{user ? user.username : ''}</p>
          <p>{profile.bio ?? ''}</p>
          <Row>
            {profile.platforms.map((platform, key) => {
              return (
                <Col key={key} xs={4}>
                  <a
                    href={
                      platform.type === 'url' &&
                      !platform.value.startsWith('http')
                        ? 'https://' + platform.value
                        : platform.webBaseURL + platform.value
                    }
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
    </>
  );
};

export default ProfileDetail;
