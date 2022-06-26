import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import MainLayout from 'components/MainLayout';
import { getUser } from 'state/ducks/users/actions';
import { getLinks } from 'state/ducks/links/actions';
import Platform from 'components/Platform';
import { Link } from 'react-router-dom';
import Toggle from 'components/Toggle';
import LinkedCards from './components/LinkedCards';
import ProfileForm from './components/ProfileForm';

const EditProfilePage = ({ location, history }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const { user, profile } = useSelector((state) => state.users);
  const { categories } = useSelector((state) => state.links);
  const { rehydrated } = useSelector((state) => state._persist);
  useEffect(() => {
    if (!authUser) {
      history.push('/login');
    } else if (rehydrated) {
      if (profile) {
        dispatch(getLinks(profile.id));
      } else {
        dispatch(getUser(authUser.username));
      }
    }
  }, [dispatch, history, authUser, rehydrated, profile]);

  function toggleChanged(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  return (
    <MainLayout>
      <Row>
        <Col md={12}>
          {user ? (
            <Toggle
              isPersonal={user.isPersonal}
              toggleChanged={toggleChanged}
            />
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <ProfileForm />
        </Col>

        <Col md={8} style={{ paddingTop: '20px' }}>
          {categories ? (
            <>
              {categories.map((category, key) => {
                return (
                  <div className="text-center" key={key}>
                    <h4>{category.name}</h4>

                    <Row>
                      {category.platforms.map((platform, key) => {
                        return (
                          <Col xs={4} md={2} key={key}>
                            <Link to={`/links/${platform.platform}`}>
                              <Platform platform={platform} showCheck={true} />
                            </Link>
                          </Col>
                        );
                      })}
                    </Row>
                  </div>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <LinkedCards />
        </Col>
      </Row>
    </MainLayout>
  );
};

export default EditProfilePage;
