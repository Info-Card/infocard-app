import React from "react";
import { Col, Row } from "react-bootstrap";
import { getProfileImageUrl } from "helpers/imageHelpers";

const ProfileDetailsCard = ({ profile }) => {
  return (
    <>
      <div className="mx-4">
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
            <h5>{profile.name}</h5>
            <h5>{profile.company}</h5>
            <h6>{profile.jobTitle}</h6>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileDetailsCard;
