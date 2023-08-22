import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "components/MainLayout";
import { GET_LINK_SUCCESS1, LINK_RESET } from "state/ducks/links/types";
import { Col, Row } from "react-bootstrap";
import { multilanguage } from "redux-multilanguage";
import LinkForm from "./components/LinkForm";
import { useParams } from "react-router-dom";
import { getUser } from "state/ducks/users/actions";

const LinkPage = ({ history }) => {
  const { platformId } = useParams();
  const dispatch = useDispatch();

  const { user: authUser } = useSelector((state) => state.auth);
  const { link, success } = useSelector((state) => state.links);

  useEffect(() => {
    dispatch({ type: GET_LINK_SUCCESS1, payload: platformId });
    dispatch(getUser(authUser.username));
  }, [dispatch, platformId, authUser]);

  useEffect(() => {
    if (success) {
      dispatch({ type: LINK_RESET });
      history.push(`/profile`);
    }
  });

  return (
    <MainLayout>
      <Row>
        <Col md={4} className="m-auto">
          {link && <LinkForm link={link} />}
        </Col>
      </Row>
    </MainLayout>
  );
};

export default multilanguage(LinkPage);
