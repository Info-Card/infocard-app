import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "state/ducks/users/actions";
import { updateProfile } from "state/ducks/profile/actions";
import { Button, Col, Row } from "react-bootstrap";
import Message from "components/Message";
import Toggle from "components/Toggle";
import Loader from "components/Loader";
import MainLayout from "components/MainLayout";
import ProfileCard from "./components/ProfileCard";
import { AddCustomLinkModal } from "./components/link/AddCustomLinkModal";
import { AddVideoModal } from "./components/video/AddVideoModal";
import LinksList from "./components/link/LinksList";
import VideoList from "./components/video/VideoList";
import ActivateTagModal from "./components/ActivateTagModal";
import PlatformList from "./components/platform/PlatformList";
import { PROFILE_RESET } from "state/ducks/profile/types";
import { multilanguage } from "redux-multilanguage";

const HomePage = ({ history, strings }) => {
  const dispatch = useDispatch();

  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);

  const { user: authUser } = useSelector((state) => state.auth);
  const { error, profile, user, loading } = useSelector((state) => state.users);
  const { success } = useSelector((state) => state.profile);
  const { rehydrated } = useSelector((state) => state._persist);

  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push("/login");
      } else {
        dispatch(getUser(authUser.username));
      }
    }
  }, [history, authUser, dispatch, rehydrated]);

  useEffect(() => {
    if (success) {
      setShowAddVideoModal(false);
      setShowCustomLinkModal(false);
      dispatch({ type: PROFILE_RESET });
      dispatch(getUser(authUser.username));
    }
  }, [dispatch, success, showAddVideoModal, authUser]);

  const handleDirectChange = (event) => {
    if (profile.platforms && profile.platforms.length > 0) {
      const platform = profile.platforms[0];
      const direct = event.target.checked ? platform.id : "";

      dispatch(updateProfile(profile.id, { direct }));
    }
  };

  const handlePrivateChange = (event) => {
    event.preventDefault();
    dispatch(
      updateProfile(profile.id, { isPrivate: !(profile.isPrivate || false) })
    );
  };

  function handleProfileChange(event) {
    event.preventDefault();
    dispatch(getUser(authUser.username, `?isPersonal=${event.target.value}`));
  }

  return (
    <MainLayout>
      {authUser && (
        <Fragment>
          {loading && <Loader />}
          <Row className="justify-content-center m-2">
            <Col md={5} lg={4}>
              {error && <Message variant="danger">{error}</Message>}
              {user && (
                <Toggle
                  isPersonal={user.isPersonal}
                  toggleChanged={handleProfileChange}
                />
              )}
              {profile && (
                <div className="mt-4">
                  <ProfileCard profile={profile} />
                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      variant="primary"
                      className="flex-grow-1 mr-1"
                      style={{
                        width: "150px",
                        backgroundColor: profile.color ?? "black",
                        border: `2px solid ${profile.color ?? "black"}`,
                      }}
                      onClick={() => setShowCustomLinkModal(true)}
                    >
                      Add links
                    </Button>
                    <Button
                      variant="primary"
                      className="flex-grow-1 ml-1"
                      style={{
                        width: "150px",
                        backgroundColor: profile.color ?? "black",
                        border: `2px solid ${profile.color ?? "black"}`,
                      }}
                      onClick={() => setShowAddVideoModal(true)}
                    >
                      {strings["upload video"]}
                    </Button>
                  </div>

                  <div className="mt-4">
                    <h5>About</h5>
                    <p>{profile.bio}</p>
                  </div>
                  <LinksList links={profile.customLinks} />
                  <VideoList videos={profile.videos} />
                  <div className="d-flex justify-content-between mt-4">
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitches"
                        checked={
                          user.direct !== "" && user.direct !== undefined
                        }
                        onChange={handleDirectChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitches"
                      >
                        {strings["Direct"]}
                      </label>
                    </div>
                    <div className="custom-control custom-switch">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="customSwitches1"
                        checked={profile.isPrivate}
                        onChange={handlePrivateChange}
                      />
                      <label
                        className="custom-control-label"
                        htmlFor="customSwitches1"
                      >
                        {strings["Private"]}
                      </label>
                    </div>
                  </div>
                  <PlatformList
                    platforms={profile.platforms}
                    direct={user.direct}
                  />
                </div>
              )}
            </Col>
          </Row>

          <ActivateTagModal />
          <AddVideoModal
            show={showAddVideoModal}
            setShow={setShowAddVideoModal}
          />
          <AddCustomLinkModal
            show={showCustomLinkModal}
            setShow={setShowCustomLinkModal}
          />
        </Fragment>
      )}
    </MainLayout>
  );
};
export default multilanguage(HomePage);
