import { getProfileImageUrl } from "helpers/imageHelpers";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ProfileCard = ({ profile }) => {
  return (
    <Row className="G-2">
      <Col xs={12}>
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
                height: "230px",
                width: "100%",
                objectFit: "fill",
              }}
            />
          </Col>
          <Col xs={6}>
            <h5 className="small-length-adjust">{profile.name}</h5>
            <h5 className="name-length-adjust small-length-adjust">
              {profile.company}
            </h5>
            <h6>{profile.jobTitle}</h6>
            <p>
              <strong>Views: </strong>
              {profile.views}
              <br />
              <strong>Info Shared: </strong>
              {profile.infoShared}
            </p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProfileCard;
