import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import { login } from "state/ducks/auth/actions";
import { multilanguage } from "redux-multilanguage";
import { useForm } from "react-hook-form";

const LoginPage = ({ location, history, strings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const { loading, error, user: authUser } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (authUser) {
      history.push(redirect);
    }
  }, [history, authUser, redirect]);

  const onSubmit = (data) => {
    dispatch(login(data.email, data.password));
  };

  return (
    <FormContainer>
      <h1>{strings["Sign In"]}</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="email">
          <Form.Label>{strings["Email Address"]}</Form.Label>
          <Form.Control
            type="email"
            placeholder={strings["Enter email"]}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <Form.Text className="text-danger">
              {errors.email.message}
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{strings["Password"]}</Form.Label>
          <Form.Control
            type="password"
            placeholder={strings["Enter password"]}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <Form.Text className="text-danger">
              {errors.password.message}
            </Form.Text>
          )}
        </Form.Group>
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
