import React from 'react'
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { error, profile, user, loading } = useSelector((state) => state.users);
  const { success } = useSelector((state) => state.profile);
  return (
    <>
                            <Row
                          className="user-card"
                          style={{
                            backgroundColor: profile.color ?? "grey",
                          }}
                          >
                          <Col
                            xs={6}
                            lg={6}
                            className="p-0"
                            id="image-adjustment"
                          >
                            {profile.image && profile.image !== "" ? (
                              <img
                                src={
                                  process.env.REACT_APP_IMAGE_URL +
                                  profile.image
                                }
                                alt=""
                                className="img-fluid image-adjust"
                              />
                            ) : (
                              <img
                                src={process.env.PUBLIC_URL + "/user.png"}
                                alt=""
                                className="img-fluid"
                                style={{
                                  height: "200px",
                                  objectFit: "contain",
                                }}
                              />
                            )}
                          </Col>

                          <Col xs={6} lg={6}>
                            <h5>{profile.name}</h5>
                            <h5 id="company-name-length-adjust">
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
    </>
  )
}

export default ProfileCard