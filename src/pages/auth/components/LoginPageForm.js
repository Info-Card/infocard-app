import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { login } from "state/ducks/auth/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPageForm = ({ strings }) => {
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const { loading } = useSelector((state) => state.auth);
  const handleShowPassword = () => {
    console.log(passwordInput, "password");
    setPasswordType(passwordType === "password" ? "text" : "password");
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmitHandler = (data) => {
    console.log(data);
    const { email, password } = data;
    dispatch(login(email, password));
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group controlId="email">
          <Form.Label>{strings["Email Address"]}</Form.Label>
          <Form.Control
            {...register("email")}
            placeholder="email"
          ></Form.Control>
        </Form.Group>
        <p className="validation-color">{errors.email?.message}</p>
        <Form.Group controlId="password">
          <Form.Label>{strings["Password"]}</Form.Label>
          <div className="password-input-container">
            <Form.Control
              onChange={(e) => setPasswordInput(e.target.value)}
              {...register("password")}
              placeholder="password"
              type={passwordType}
              className="password-input"
            />
            <div className="password-icon">
              <FontAwesomeIcon
                icon={passwordType === "password" ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={handleShowPassword}
              />
            </div>
          </div>
        </Form.Group>
        <p className="validation-color">{errors.password?.message}</p>
        <Link to="/forgot-password" className="float-right">
          {strings["forgot password?"]}
        </Link>
        <br />
        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings["Sign In"]}
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          {["Don't Have an Account?"]}{" "}
          <Link to={"/register"}>{["Sign Up"]}</Link>
        </Col>
      </Row>
    </>
  );
};
export default LoginPageForm;
