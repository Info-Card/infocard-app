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
            <span className="max-lines mb-0" style={{ fontSize: "17px" }}>
              <h5>{profile.name}</h5>
              <br></br>
            </span>
            <span className="max-lines mb-0">
              <h5>{profile.company}</h5>
            </span>
            <span className="max-lines mb-0">
              <h6>{profile.jobTitle}</h6>
            </span>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ProfileDetailsCard;
