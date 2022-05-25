import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'state/ducks/user/actions';
import ProfileDescription from './components/ProfileDescription';

const Profile = ({ history, match }) => {
  const username = match.params.username;
  const dispatch = useDispatch();
  const { data: user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(username));
  }, [username, dispatch]);

  return (
    <Fragment>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{username} - Info Card</title>
      </Helmet>

      {user ? <ProfileDescription history={history} /> : <></>}
    </Fragment>
  );
};

export default Profile;
