import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "components/MainLayout";
import { Helmet } from "react-helmet";
import { GET_LINK_SUCCESS1, LINK_RESET } from "state/ducks/links/types";
import { Button, Col, Form, Row } from "react-bootstrap";
import Message from "components/Message";
import Loader from "components/Loader";
import {
  createLink,
  deleteLink,
  updateLink,
  updateSharedLink,
} from "state/ducks/links/actions";
import ContactPlatform from "./components/ContactPlatform";
import { multilanguage } from "redux-multilanguage";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import linkService from "services/LinkService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  This: yup.string().required(),
});

const LinkPage = ({ history, match, strings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const linkId = match.params.linkId;

  const [fileName, setFileName] = useState("Choose File");
  const [path, setPath] = useState("");

  const [uploading, setUploading] = useState(false);

  const [medicalCard, setMedicalCard] = useState({
    emergencyContact: "",
    healthCondition: "",
    allergies: "",
    bloodType: "",
    remedies: "",
    donor: "",
    height: "",
    weight: "",
  });

  const { user: authUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);
  const { categories, link, error, loading, success } = useSelector(
    (state) => state.links
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!authUser) {
      history.push("/login");
    } else {
      if (success) {
        dispatch({ type: LINK_RESET });
        history.push(`/profile`);
      } else if (!link) {
        dispatch({ type: GET_LINK_SUCCESS1, payload: linkId });
      } else if (link) {
        if (link.type === "medical") {
          setMedicalCard(
            link.value !== undefined && link.value !== ""
              ? JSON.parse(link.value)
              : {
                  emergencyContact: "",
                  healthCondition: "",
                  allergies: "",
                  bloodType: "",
                  remedies: "",
                  donor: "",
                  height: "",
                  weight: "",
                }
          );
        } else {
          setPath(link.type === "contact" ? profile.id : link.value);
        }
      }
    }
  }, [history, authUser, linkId, link, categories, dispatch, success, profile]);

  const submitHandler = () => {
    // e.preventDefault();
    var value = link.type !== "medical" ? path : JSON.stringify(medicalCard);
    if (link.id) {
      dispatch(updateLink(link.id, { value }));
    } else {
      dispatch(
        createLink({
          platform: link.platform,
          value,
          profile: profile.id,
        })
      );
    }
    reset();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    dispatch(deleteLink(link.id));
  };

  const handleShare = (id, isShared) => {
    dispatch(updateSharedLink(id, { isShared }, authUser.username));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    setUploading(true);
    try {
      const { data } = linkService.uploadFile(file);
      setPath(data.message);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  return (
    <MainLayout>
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{authUser.username} - Info Card</title>
        </Helmet>

        <Row>
          <Col md={4} />
          <Col md={4}>
            <div className="text-center">
              {error ? <Message variant="danger">{error}</Message> : <></>}
              {link ? (
                <div className="">
                  {link.image && link.image !== "" ? (
                    <img
                      src={process.env.REACT_APP_IMAGE_URL + link.image}
                      alt=""
                      className="profile-image m-3"
                    />
                  ) : (
                    <img
                      src={process.env.PUBLIC_URL + "/user.png"}
                      alt=""
                      className="profile-image m-3"
                    />
                  )}

                  <h4>{link.title ?? ""}</h4>
                  <p>{link.headline ?? ""}</p>
                  {link.type === "contact" && (
                    <Row>
                      {profile.platforms.map((platform, key) => {
                        return (
                          <Col key={key} xs={12}>
                            {platform.type !== "contact" &&
                              platform.type !== "medical" && (
                                <ContactPlatform
                                  platform={platform}
                                  handleShare={handleShare}
                                />
                              )}
                          </Col>
                        );
                      })}
                    </Row>
                  )}

                  <Form onSubmit={handleSubmit(submitHandler)}>
                    {link.type === "medical" && (
                      <div
                        style={{ height: "310px", overflowY: "scroll" }}
                        className="text-left"
                      >
                        <Form.Group controlId="emergencyContact">
                          <Form.Label>
                            {strings["Emergency Contact"]}
                          </Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Emergency Contact"]}
                            value={medicalCard.emergencyContact}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                emergencyContact: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="healthCondition">
                          <Form.Label>{strings["State of health"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["State of health"]}
                            value={medicalCard.healthCondition}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                healthCondition: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="allergies">
                          <Form.Label>{strings["Allergies"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Allergies"]}
                            value={medicalCard.allergies}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                allergies: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="bloodType">
                          <Form.Label>{strings["Blood Type"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Blood Type"]}
                            value={medicalCard.bloodType}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                bloodType: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="remedies">
                          <Form.Label>{strings["Remedies"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Remedies"]}
                            value={medicalCard.remedies}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                remedies: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="donor">
                          <Form.Label>{strings["Donor"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Donor"]}
                            value={medicalCard.donor}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                donor: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId="height">
                          <Form.Label>{strings["Height"]}</Form.Label>
                          <Form.Control
                            type="text"
                            placeholder={strings["Height"]}
                            value={medicalCard.height}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                height: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="weight">
                          <Form.Label>{strings["Weight"]}</Form.Label>
                          <Form.Control
                            type="number"
                            placeholder={strings["Weight"]}
                            value={medicalCard.weight}
                            onChange={(e) =>
                              setMedicalCard({
                                ...medicalCard,
                                weight: e.target.value,
                              })
                            }
                          ></Form.Control>
                        </Form.Group>
                      </div>
                    )}
                    {link.type === "file" && (
                      <Form.Group controlId="image">
                        <Form.File
                          type="file"
                          id="inputGroupFile01"
                          label={fileName}
                          onChange={uploadFileHandler}
                          custom
                        />
                      </Form.Group>
                    )}
                    {link.type === "phone" && (
                      <Form.Group controlId="value">
                        <PhoneInput
                          placeholder="Enter phone number"
                          country={"us"}
                          value={path}
                          onChange={(phone) => setPath(phone)}
                        />
                      </Form.Group>
                    )}
                    {link.type !== "contact" &&
                      link.type !== "medical" &&
                      link.type !== "file" &&
                      link.type !== "phone" && (
                        <Form.Group controlId="value">
                          <Form.Control
                            type="text"
                            {...register("This")}
                            placeholder="Enter Here"
                            value={path}
                            onChange={(e) => setPath(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                      )}
                    <p>{errors.This?.message}</p>

                    {loading || uploading ? (
                      <Loader />
                    ) : (
                      <div>
                        <Button type="submit" variant="primary">
                          {link.id ? strings["Update"] : strings["Save"]}
                        </Button>
                        {link.id ? (
                          <Button
                            type=""
                            variant="danger"
                            style={{ marginLeft: "10px" }}
                            onClick={handleDeleteClick}
                          >
                            Delete
                          </Button>
                        ) : (
                          <></>
                        )}
                      </div>
                    )}
                  </Form>
                </div>
              ) : (
                <></>
              )}
            </div>
          </Col>
          <Col md={4} />
        </Row>
      </Fragment>
    </MainLayout>
  );
};

export default multilanguage(LinkPage);
