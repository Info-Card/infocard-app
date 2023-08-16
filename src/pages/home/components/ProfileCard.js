import { getProfileImageUrl } from "helpers/imageHelpers";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ProfileCard = ({ profile }) => {
  return (
    <Row
      className="user-card"
      style={{
        backgroundColor: profile.color ?? "grey",
      }}
    >
      <Col xs={6} className="p-0">
        <img
          src={getProfileImageUrl(profile)}
          alt=""
          className="img-fluid"
          style={{
            width: "100%",
            objectFit: "fit",
          }}
        />
      </Col>
      <Col xs={6}>
        <span className="max-lines mb-0" style={{ fontSize: "17px" }}>
          {profile.name}
        </span>
        <span className="max-lines mb-0">
          {profile.company} <br />
        </span>
        <span>
          {profile.jobTitle}
          <br />
        </span>
        <span className="max-lines mb-0">
          <strong>Views: </strong>
          {profile.views}
          <br />
        </span>
        <span className="max-lines mb-0">
          <strong>Info Shared: </strong>
          {profile.infoShared}
        </span>
      </Col>
    </Row>
  );
};

export default ProfileCard;
