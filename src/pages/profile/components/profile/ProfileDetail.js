import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { exchangeContact } from "state/ducks/profile/actions";
import { multilanguage } from "redux-multilanguage";
import { getLink } from "state/ducks/links/actions";
import LinksList from "pages/home/components/link/LinksList";
import VideoList from "pages/home/components/video/VideoList";
import ListPlatForms from "../ListPlatForms";

const ProfileDetail = ({ user, profile, strings }) => {
  const [showExchange, setShowExchange] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      if (
        user.direct !== "" &&
        user.direct !== undefined &&
        user.personal &&
        user.business
      ) {
        const platforms = user.personal.platforms.concat(
          user.business.platforms
        );
        platforms.forEach((platform) => {
          if (platform.id === user.direct) {
            openLink(platform, false);
          }
        });
      }
    }
  }, [user, dispatch]);

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

  const handleExchange = (event) => {
    event.preventDefault();
    console.log(form);
    dispatch(exchangeContact(profile.id, form));
    setForm({ name: "", email: "", message: "", number: "" });
    setShowExchange(false);
  };

  return (
    <>
      {profile && user && (user.direct === "" || user.direct === undefined) ? (
        <div className="mb-5">
          <Row className="g-2">
            <div className="d-flex align-items-center justify-content-between  mt-3 mb-1">
              <img src="logo.png" alt="" style={{ width: "80px" }} />
              <a href={`https://infocard.me`}>
                <Button type="submit" variant="outline-primary">
                  Get Your Card
                </Button>
              </a>
            </div>
            <Col xs={12} className="">
              <Row
                className="user-card"
                style={{
                  backgroundColor: profile.color ?? "grey",
                }}
              >
                <Col xs={6} className="p-0">
                  {profile.image && profile.image !== "" ? (
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + profile.image}
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "fill",
                      }}
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/user.png"}
                      alt=""
                      className="img-fluid"
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "fill",
                      }}
                    />
                  )}
                </Col>

                <Col xs={6}>
                  <h5>{profile.name}</h5>
                  <h5>{profile.company}</h5>
                  <h6>{profile.jobTitle}</h6>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={6}>
                  <a
                    href={`https://api.infocard.me/v1/profile/contact/${profile.id}`}
                  >
                    <Button
                      type="submit"
                      id="save-contact-text-adjustment"
                      style={{
                        backgroundColor: profile.color ?? "grey",
                        color: "white",
                        width: "100%",
                        border: `2px solid ${profile.color ?? "grey"}`,
                      }}
                    >
                      {strings["Save Contact"]}
                    </Button>
                  </a>
                </Col>
                <Col xs={6}>
                  <Button
                    type="submit"
                    id="save-contact-text-adjustment"
                    style={{
                      backgroundColor: profile.color ?? "grey",
                      color: "white",
                      width: "100%",
                      border: `2px solid ${profile.color ?? "grey"}`,
                    }}
                    onClick={(e) => {
                      setShowExchange(true);
                    }}
                  >
                    {strings["Exchange"]}
                  </Button>
                </Col>
              </Row>
            </Col>
            <>
              <h5 style={{ paddingTop: "20px" }}>About</h5>
              <Col xs={12}>{profile.bio}</Col>
            </>
            <LinksList links={profile.customLinks} />
            <VideoList videos={profile.videos} />
            {profile.platforms && profile.platforms.length > 0 ? (
              <>
                <h5 style={{ paddingTop: "10px" }}>Platforms</h5>
                <ListPlatForms profile={profile} />
              </>
            ) : (
              <></>
            )}
          </Row>
          <Modal show={showExchange}>
            <Modal.Header closeButton onHide={(e) => setShowExchange(false)}>
              <Modal.Title>
                {strings["Exchange Contact with"]} {profile.name}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleExchange}>
                <Form.Group controlId="name">
                  <Form.Label>{strings["Your Name"]}</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder={strings["Enter name"]}
                    value={form.name}
                    required
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  ></Form.Control>
                  <Form.Label>{strings["Your Email"]}</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={strings["Enter email"]}
                    value={form.email}
                    required
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                  ></Form.Control>
                  <Form.Label>{strings["Your Number"]}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={strings["Enter number"]}
                    value={form.number}
                    required
                    onChange={(e) =>
                      setForm({ ...form, number: e.target.value })
                    }
                  ></Form.Control>
                  <Form.Label>{strings["Message"]}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={strings["Enter message"]}
                    value={form.message}
                    required
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                  ></Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary">
                  {strings["Exchange"]}
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default multilanguage(ProfileDetail);
