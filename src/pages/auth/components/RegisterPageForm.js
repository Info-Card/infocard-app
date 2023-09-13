import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "state/ducks/auth/actions";

const schema = yup.object().shape({
  username: yup
    .string()
    .required()
    .matches(
      /^[a-zA-Z0-9_]{4,20}$/,
      "Username can only contain alphabets, numbers, and underscores, and must be 4 to 20 characters long"
    ),
  email: yup.string().email("Email must be valid").required(),
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8, "Confirm password must be at least 8 characters")
    .max(32)
    .required(),
  message: yup.string().min(8).max(100),
});

const RegisterPageForm = ({ strings, setMessage }) => {
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const onSubmitHandler = (data) => {
    console.log(data);
    const { username, email, password, confirmPassword } = data;
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(registerUser({ username, email, password }));
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmitHandler)}>
        <Form.Group controlId="name">
          <Form.Label>{strings["Username"]}</Form.Label>
          <Form.Control
            {...register("username")}
            placeholder="username"
          ></Form.Control>
        </Form.Group>
        <p className="validation-color">{errors.username?.message}</p>
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
          <Form.Control
            {...register("password")}
            placeholder="password"
            type="password"
          ></Form.Control>
        </Form.Group>
        <p className="validation-color">{errors.password?.message}</p>
        <Form.Group controlId="confirmPassword">
          <Form.Label>{strings["Confirm Password"]}</Form.Label>
          <Form.Control
            {...register("confirmPassword")}
            placeholder="confirmPassword"
            type="password"
          ></Form.Control>
        </Form.Group>
        <p className="validation-color">{errors.confirmPassword?.message}</p>
        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings["Sign Up"]}
        </Button>
      </Form>
    </>
  );
};

export default RegisterPageForm;
