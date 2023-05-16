import React from "react";
import { Col, Row } from "react-bootstrap";
import PlatformCard from "./PlatformCard";

const PlatformList = ({ platforms, direct }) => {
  return (
    <>
      {platforms && platforms.length > 0 && (
        <>
          <h5 style={{ paddingTop: "10px" }}>Platforms</h5>
          <Col xs={12}>
            <Row className="g-2">
              {platforms.map((platform, key) => {
                return (
                  <Col key={key} xs={12}>
                    <PlatformCard platform={platform} direct={direct} />
                  </Col>
                );
              })}
            </Row>
          </Col>
        </>
      )}
    </>
  );
};

export default PlatformList;
