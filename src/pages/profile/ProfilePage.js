import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";
import { getProfile } from "state/ducks/profile/actions";
import { getTag } from "state/ducks/tags/actions";
import ProfileDetail from "./components/profile/ProfileDetail";
import Loader from "components/Loader";
import { multilanguage } from "redux-multilanguage";
import Swal from "sweetalert2";
import NotFound from "pages/error/NotFound";

const ProfilePage = ({ history, match, strings }) => {
  const username = match.params.username;
  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector(
    (state) => state.profile
  );
  const { tag, error: tagError } = useSelector((state) => state.tags);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile(username, authUser));
  }, [dispatch, username, authUser]);

  useEffect(() => {
    if (error) {
      dispatch(getTag(username));
    }
  }, [dispatch, username, error]);

  useEffect(() => {
    if (error && tagError) {
      history.push("/not-found");
    }
  }, [history, tagError, error]);

  useEffect(() => {
    if (tag) {
      if (authUser) {
        history.push("/");
      } else {
        Swal.fire({
          title: `<img src="/apple-touch-icon.png" alt="logo" /><br/><strong>${strings["Activate your product"]}</strong>`,

          html: strings[
            "To Activate your product you need to login or register first"
          ],
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: "Login",
          cancelButtonText: "Register",
          cancelButtonClasses: "btn",
          customClass: {
            cancelButton: "cancel-button", // Add your custom class for the Register button
          },
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/login");
          } else {
            history.push("/register");
          }
        });
      }
    }
  }, [tag, authUser, history, strings]);

  return (
    <Container>
      <Fragment>
        <Row>
          <Col md={5} className="m-auto">
            <div className="">
              {loading && <Loader />}
              {!loading && (!profile || profile.isPrivate) && <NotFound />}
              {!loading && profile && !profile.isPrivate ? (
                <ProfileDetail user={user} profile={profile} />
              ) : null}

            </div>
          </Col>
        </Row>
      </Fragment>
    </Container>
  );
};

export default multilanguage(ProfilePage);
