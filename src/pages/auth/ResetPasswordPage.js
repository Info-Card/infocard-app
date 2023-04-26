import React, { useState, Fragment, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import { resetPassword } from "state/ducks/auth/actions";
import * as types from "state/ducks/auth/types";
import { multilanguage } from "redux-multilanguage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ResetPasswordPage = ({ location, history, strings }) => {
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { success, error, loading } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (success) {
      dispatch({ type: types.AUTH_RESET });
      history.push("/login");
    }
  }, [history, success, dispatch]);
  const onSubmit = (data) => {
    console.log("ok on submit");
    const token = query.get("token");
    dispatch(resetPassword(token, password));
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = query.get("token");

    if (confirmPassword === password) {
      console.log("if is clear");
      dispatch(resetPassword(token, password));
    } else {
      console.log("else is clear");
      // <Message>"Password </Message>
      // dispatch({
      //   type: types.AUTH_FAIL,
      //   payload: strings["Password doesnt match"],
      // });
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
              name="password"
              type="password"
              {...register("password")}
              placeholder={strings["Enter password"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {errors.password && <p>{errors.password.message}</p>}
          <Form.Group controlId="confirmPassword">
            <Form.Label>{strings["Confirm Password"]}</Form.Label>
            <Form.Control
              name="confirmPassword"
              {...register("confirmPassword")}
              type="password"
              placeholder={strings["Enter confirm password"]}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
          <Button type="submit" variant="primary">
            {strings["Update"]}
          </Button>
        </Form>

        {/* <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row> */}
      </FormContainer>
    </Fragment>
  );
};

export default multilanguage(ResetPasswordPage);
