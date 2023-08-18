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
        <h5 className="max-lines">{profile.name}</h5>
        <h6 className="max-lines">{profile.company}</h6>
        <h6 className="max-lines">{profile.jobTitle}</h6>
        <span className="max-lines">
          <strong>Views: </strong>
          {profile.views}
          <br />
        </span>
        <span className="max-lines">
          <strong>Info Shared: </strong>
          {profile.infoShared}
        </span>
      </Col>
    </Row>
  );
};

export default ProfileCard;
