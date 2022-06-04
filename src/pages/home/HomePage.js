import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { Helmet } from 'react-helmet';
import { getUser } from 'state/ducks/users/actions';

const HomePage = ({ history }) => {
  const [profile, setProfile] = useState(null);
  const { user: authUser } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    } else if (!user) {
      dispatch(getUser(authUser.username));
    } else {
      if (user.isPersonal) {
        setProfile(user.personal);
      } else {
        setProfile(user.business);
      }
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
              <p>@{user ? user.username : ''}</p>
              <p style={{ wordWrap: 'break-word' }}>
                {profile ? profile.bio : ''}
              </p>
            </div>
          </div>
        </Fragment>
      ) : (
        <></>
      )}
    </MainLayout>
  );
};

export default HomePage;
