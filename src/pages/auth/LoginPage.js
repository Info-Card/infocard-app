import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "components/Loader";
import Message from "components/Message";
import FormContainer from "components/FormContainer";
import { login } from "state/ducks/auth/actions";
import { multilanguage } from "redux-multilanguage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = ({ location, history, strings }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();

  const { loading, error, user: authUser } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authUser) {
      history.push(redirect);
    }
  }, [history, authUser, redirect]);

  const onSubmitHandler = (data) => {
    console.log(data);
    const { email, password } = data;
    dispatch(login(email, password));
    reset();
  };

  return (
    <FormContainer>
      <h1>{strings["Sign In"]}</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
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
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="password-toggle-button"
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
        <p>{errors.password?.message}</p>
        <Link to="/forgot-password" className="float-right">
          {strings["forgot password?"]}
        </Link>
        <br />
        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings["Sign In"]}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default multilanguage(LoginPage);
