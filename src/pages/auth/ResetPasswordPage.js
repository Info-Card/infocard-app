import React, { useState, Fragment, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import { resetPassword } from "state/ducks/auth/actions";
import * as types from "state/ducks/auth/types";
import { multilanguage } from "redux-multilanguage";

const ResetPasswordPage = ({ location, history, strings }) => {
  const query = new URLSearchParams(location.search);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.AUTH_RESET });
      history.push("/login");
    }
  }, [history, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const token = query.get("token");

    if (confirmPassword === password) {
      dispatch(resetPassword(token, password));
    } else {
      dispatch({
        type: types.AUTH_FAIL,
        payload: strings["Password doesnt match"],
      });
    }
  };

  return (
    <Fragment>
      <FormContainer>
        <h3>{strings["Reset Password"]}</h3>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <Form.Label>{strings["Password"]}</Form.Label>
            <Form.Control
              type="password"
              placeholder={strings["Enter password"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>{strings["Confirm Password"]}</Form.Label>
            <Form.Control
              type="password"
              placeholder={strings["Enter confirm password"]}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            {strings["Update"]}
          </Button>
        </Form>
      </FormContainer>
    </Fragment>
  );
};

export default multilanguage(ResetPasswordPage);
