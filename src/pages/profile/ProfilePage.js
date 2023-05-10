import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { Col, Container, Row } from "react-bootstrap";
import { getProfile } from "state/ducks/profile/actions";
import { getTag } from "state/ducks/tags/actions";
import ProfileDetail from "./components/ProfileDetail";
import Loader from "components/Loader";
import { multilanguage } from "redux-multilanguage";
import ProfileModal from "./components/ProfileModal";

const ProfilePage = ({ history, match, strings }) => {
  const props = strings;
  const username = match.params.username;
  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector(
    (state) => state.profile
  );
  const { tag, error: tagError } = useSelector((state) => state.tags);
  const { rehydrated } = useSelector((state) => state._persist);

  const dispatch = useDispatch();
  useEffect(() => {
    if (rehydrated) {
      if (error) {
        if (!tag) {
          if (tagError) {
            history.push("/not-found");
          } else {
            dispatch(getTag(username));
          }
        } else if (authUser) {
          history.push("/");
        }
      } else if (profile && profile.isPrivate) {
        history.push("/not-found");
      } else if (!profile) {
        dispatch(getProfile(username, authUser));
      }
    }
  }, [
    history,
    authUser,
    dispatch,
    username,
    rehydrated,
    error,
    tag,
    tagError,
    profile,
  ]);

  return (
    <Container fluid>
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{user ? user.username : ""} - Info Card</title>
        </Helmet>
        <Row>
          <Col md={4} />
          <Col md={4}>
            <div className="">
              {loading && <Loader />}
              {profile && !profile.isPrivate && (
                <ProfileDetail user={user} profile={profile} />
              )}
            </div>
          </Col>
          <Col md={4} />
          <ProfileModal message={props} />
        </Row>
      </Fragment>
    </Container>
  );
};

export default multilanguage(ProfilePage);
