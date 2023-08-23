import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { multilanguage } from "redux-multilanguage";
import { getLink } from "state/ducks/links/actions";
import LinksList from "pages/home/components/link/LinksList";
import VideoList from "pages/home/components/video/VideoList";
import ListPlatForms from "../ListPlatForms";
import ProfileDetailModal from "./ProfileDetailModal";
import ProfileDetailsHeader from "./components/ProfileDetailsHeader";
import ProfileDetailsCard from "./components/ProfileDetailsCard";
import SaveContectButton from "./components/SaveContectButton";
import ExchangeButton from "./components/ExchangeButton";

const ProfileDetail = ({ user, profile, strings }) => {
  const [showExchange, setShowExchange] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const openLink = (platform, newTab) => {
      dispatch(getLink(platform.id, "?isTapped=true"));
      var urlString =
        platform.type === "url" && !platform.value.startsWith("http")
          ? "https://" + platform.value
          : platform.webBaseURL + platform.value;
      if (platform.type === "medical") {
        urlString = platform.webBaseURL + platform.id;
      }
      window.open(urlString, newTab ? "_blank" : "_self");
    };
    if (user) {
      if (
        user.direct !== "" &&
        user.direct !== undefined &&
        user.personal &&
        user.business
      ) {
        const platforms = user.personal.platforms.concat(
          user.business.platforms
        );
        platforms.forEach((platform) => {
          if (platform.id === user.direct) {
            openLink(platform, false);
          }
        });
      }
    }
  }, [user, dispatch]);

  return (
    <>
      {profile && user && (user.direct === "" || user.direct === undefined) ? (
        <div className="mb-5">
          <Row className="g-2">
            <ProfileDetailsHeader />
            <Col xs={12} className="">
              <ProfileDetailsCard profile={profile} />
              <Row className="mt-3">
                <SaveContectButton profile={profile} strings={strings} />
                <ExchangeButton
                  profile={profile}
                  strings={strings}
                  setShowExchange={setShowExchange}
                />
              </Row>
            </Col>
            <>
              <h4
                className="ml-2"
                style={{ paddingTop: "20px", paddingLeft: "7px" }}
              >
                About
              </h4>
              <Col xs={12}>{profile.bio}</Col>
            </>
            <div className="pl-3">
              <LinksList links={profile.customLinks} />
            </div>
            <div className="pl-3">
              <VideoList videos={profile.videos} />
            </div>
            {profile.platforms && profile.platforms.length > 0 && (
              <div>
                <h4
                  className="ml-2"
                  style={{ paddingTop: "10px", paddingLeft: "4px" }}
                >
                  Platforms
                </h4>
                <ListPlatForms profile={profile} />
              </div>
            )}
          </Row>
          <ProfileDetailModal
            showExchange={showExchange}
            setShowExchange={setShowExchange}
            strings={strings}
            profile={profile}
            user={user}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default multilanguage(ProfileDetail);
