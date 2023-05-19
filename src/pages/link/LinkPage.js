import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "components/MainLayout";
import { Helmet } from "react-helmet";
import { GET_LINK_SUCCESS1, LINK_RESET } from "state/ducks/links/types";
import { Col, Row } from "react-bootstrap";
import Message from "components/Message";
import { multilanguage } from "redux-multilanguage";
import "react-phone-input-2/lib/style.css";
import LinkPageForm from "./components/LinkPageForm";

const LinkPage = ({ history, match, strings }) => {
  const linkId = match.params.linkId;
  const [path, setPath] = useState("");
  const { user: authUser } = useSelector((state) => state.auth);
  const { profile } = useSelector((state) => state.users);
  const { categories, link, error, success } = useSelector(
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
        setPath(link.type === "contact" ? profile.id : link.value);
      }
    }
  }, [history, authUser, linkId, link, categories, dispatch, success, profile]);

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
                  <LinkPageForm strings={strings} />
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
