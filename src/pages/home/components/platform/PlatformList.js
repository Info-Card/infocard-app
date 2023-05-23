import React from "react";
import { Col, Row } from "react-bootstrap";
import PlatformCard from "./PlatformCard";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
            <Row className="g-2">
              <Col xs={12}>
                <div className="platform-card p-2 mt-2 text-center">
                  <p className="m-0">
                    {["+"]}{" "}
                    <Link to={"/profile"}>
                      {["Add Links and Contect Info"]}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </>
      )}
    </>
  );
};

export default PlatformList;
