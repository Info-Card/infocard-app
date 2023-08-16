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
        <br />
        {profile.company} <br /> {profile.jobTitle}
        <br />
        <strong>Views: </strong>
        {profile.views}
        <br />
        <strong>Info Shared: </strong>
        {profile.infoShared}
      </Col>
    </Row>
  );
};

export default ProfileCard;
