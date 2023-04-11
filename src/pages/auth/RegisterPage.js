import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import { registerUser } from "state/ducks/auth/actions";
import { multilanguage } from "redux-multilanguage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().min(6).max(20).required().unique(),
  email: yup.string().email().required().unique(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup.string().min(8).max(32).required(),
  message: yup.string().min(8).max(100),
});

const RegisterPage = ({ location, history, strings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const { loading, error, user: authUser } = useSelector((state) => state.auth);
  const { tag } = useSelector((state) => state.tags);
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authUser || !tag) {
      history.push(redirect);
    }
  }, [history, authUser, redirect, tag]);

  const onSubmitHandler = (data) => {
    console.log(data);
    const { username, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser(username, email, password));
      reset();
    }
  };

  return (
    <FormContainer>
      <h1>{strings["Sign Up"]}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group controlId="name">
          <Form.Label>{strings["Username"]}</Form.Label>
          <Form.Control
            {...register("username")}
            placeholder="username"
          ></Form.Control>
        </Form.Group>
        <p>{errors.username?.message}</p>

        <Form.Group controlId="email">
          <Form.Label>{strings["Email Address"]}</Form.Label>
          <Form.Control
            {...register("email")}
            placeholder="email"
          ></Form.Control>
        </Form.Group>
        <p>{errors.email?.message}</p>
        <Form.Group controlId="password">
          <Form.Label>{strings["Password"]}</Form.Label>
          <Form.Control
            {...register("password")}
            placeholder="password"
            type="password"
          ></Form.Control>
        </Form.Group>
        <p>{errors.password?.message}</p>
        <Form.Group controlId="confirmPassword">
          <Form.Label>{strings["Confirm Password"]}</Form.Label>
          <Form.Control
            {...register("confirmPassword")}
            placeholder="confirmPassword"
            type="password"
          ></Form.Control>
        </Form.Group>
        <p>{errors.confirmPassword?.message}</p>
        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings["Sign Up"]}
        </Button>
      </Form>

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
