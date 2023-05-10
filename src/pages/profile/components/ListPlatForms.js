import React from "react";
import { Col, Row } from "react-bootstrap";
import Platform from "components/Platform";
import { useDispatch } from "react-redux";
import { getLink } from "state/ducks/links/actions";

const ListPlatForms = (props) => {
  const profile = props.profile;
  const dispatch = useDispatch();
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
  return (
    <>
      <Col xs={12} md={12}>
        <div className="platform-card p-3">
          <Row>
            {profile.platforms.map((platform, key) => {
              return (
                <Col key={key} xs={4}>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      openLink(platform, true);
                    }}
                  >
                    <Platform platform={platform} />
                  </a>
                </Col>
              );
            })}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default ListPlatForms;
