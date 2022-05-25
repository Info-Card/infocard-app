import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Platform from './Platform';

const ProfileDescription = ({ history }) => {
  const { data: user } = useSelector((state) => state.user);
  const [profile, setProfile] = useState(null);

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
              platform.isUrl && !platform.value.startsWith('http')
                ? 'https://' + platform.value
                : platform.webBaseURL + platform.value;
            window.open(urlString, '_self');
          }
        });
      } else {
        if (user.isPersonal) {
          setProfile(user.personal);
        } else {
          setProfile(user.business);
        }
      }
    }
  }, [history, user]);

  const connectHandler = () => {
    var urlString =
      'https://api.chapysocial.com/v1/profile/contact/' + profile.id;
    window.open(urlString, '_self');
  };

  return (
    <div className="container">
      {user ? (
        <>
          {user.direct === '' || user.direct === undefined ? (
            <div className="row">
              <div className="col-md-6 m-auto text-center shadow p-3 mb-5 bg-white rounded">
                <div className="">
                  {profile && profile.image && profile.image !== '' ? (
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
                </div>
                <h4>{profile ? profile.name : ''}</h4>
                <p>@{user.username}</p>
                <p style={{ wordWrap: 'break-word' }}>
                  {profile ? profile.bio : ''}
                </p>
                <button
                  className="connect-button rounded-pill"
                  onClick={connectHandler}
                >
                  Connect with me
                </button>
                {profile ? (
                  <div>
                    {profile.platforms && profile.platforms.length >= 1 ? (
                      <div className="row m-4">
                        {profile.platforms.map((platform, key) => {
                          return (
                            <div className="col-4" key={key}>
                              <Platform platform={platform} />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                ) : (
                  <h4 className="text-center">
                    This profile is private please connect to view accounts.
                  </h4>
                )}
              </div>
            </div>
          ) : (
            <>Direct On</>
          )}
        </>
      ) : (
        <>User Not Found</>
      )}
    </div>
  );
};

export default ProfileDescription;
