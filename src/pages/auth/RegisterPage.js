import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import { multilanguage } from "redux-multilanguage";
import RegisterPageForm from "./components/RegisterPageForm";

const RegisterPage = ({ location, history, strings }) => {
  const { loading, error, user: authUser } = useSelector((state) => state.auth);
  const redirect = location.search ? location.search.split("=")[1] : "/";
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (authUser) {
      history.push(redirect);
    }
  }, [history, authUser, redirect]);

  return (
    <FormContainer>
      <h1>{strings["Sign Up"]}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <RegisterPageForm setMessage={setMessage} strings={strings} />
      <Row className="py-3">
        <Col>
          {strings["Have an Account?"]}{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            {strings["Login"]}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default multilanguage(RegisterPage);
