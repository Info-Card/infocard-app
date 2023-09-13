import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "state/ducks/users/actions";
import { updateProfile } from "state/ducks/profile/actions";
import { Alert, Button, Col, Row } from "react-bootstrap";
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
import Swal from "sweetalert2";

const HomePage = ({ history, strings }) => {
  const dispatch = useDispatch();
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);
  const [showCustomLinkModal, setShowCustomLinkModal] = useState(false);
  const { user: authUser } = useSelector((state) => state.auth);
  const { profile, user, loading } = useSelector((state) => state.users);
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
  }, [dispatch, success, showAddVideoModal, authUser, profile]);

  const handleDirectChange = (event) => {
    if (profile.platforms && profile.platforms.length > 0) {
      const platform = profile.platforms[0];
      const direct = event.target.checked ? platform.id : "";

      dispatch(updateProfile(profile.id, { direct }));
    }
  };
  const handleVideosLength = () => {
    const { videos } = profile;
    const videosLength = videos.length;
    if (videosLength < 10) {
      setShowAddVideoModal(true);
    } else {
      Swal.fire(
        "Error",
        "Maximum video limit reached. You cannot add more than 10 videos",
        "error"
      );
    }
  };
  const handleLinksLength = () => {
    const { customLinks } = profile;
    const linksLength = customLinks.length;
    if (linksLength < 10) {
      setShowCustomLinkModal(true);
    } else {
      Swal.fire(
        "Error",
        "Maximum links limit reached. You cannot add more than 10 links",
        "error"
      );
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
          <Row>
            <Col md={7} lg={5} className="m-auto">
              {loading ? (
                <Loader />
              ) : (
                <>
                  {!profile?.name && (
                    <Row>
                      <Alert variant="dark">
                        Please complete your profile!
                      </Alert>
                    </Row>
                  )}
                </>
              )}
              {user && (
                <Toggle
                  isPersonal={user.isPersonal}
                  toggleChanged={handleProfileChange}
                />
              )}
              {profile && (
                <div className="mt-4">
                  <div className="mx-4">
                    <ProfileCard profile={profile} />
                  </div>
                  <div className="d-flex justify-content-between mt-4">
                    <Button
                      variant="primary"
                      className="flex-grow-1 mr-1"
                      style={{
                        width: "150px",
                        backgroundColor: profile.color ?? "black",
                        border: `2px solid ${profile.color ?? "black"}`,
                      }}
                      onClick={handleLinksLength}
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
                      onClick={handleVideosLength}
                    >
                      {strings["upload video"]}
                    </Button>
                  </div>
                  <div className="mt-4">
                    {profile.bio && (
                      <>
                        <h4>About</h4>
                        <p
                          style={{
                            overflowWrap: "break-word",
                            whiteSpace: "pre-wrap",
                          }}
                        >
                          {profile.bio}
                        </p>
                      </>
                    )}
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
