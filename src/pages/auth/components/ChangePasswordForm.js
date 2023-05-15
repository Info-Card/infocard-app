import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import * as types from "state/ducks/users/types";
import { updateUser } from "state/ducks/users/actions";

const schema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .max(
      32,
      "Error: Password is too long. Please enter a password with a maximum of 32 characters."
    )
    .min(8, "Password must be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const ChangePasswordForm = ({ strings }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    if (confirmPassword === password) {
      dispatch(updateUser({ password }));
    } else {
      dispatch({
        type: types.USER_FAIL,
        payload: strings["Password doesn't match"],
      });
    }
    console.log(data);
  };
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="password">
          <Form.Label>{strings["Password"]}</Form.Label>
          <Form.Control
            type="password"
            {...register("password")}
            placeholder={strings["Enter password"]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <p className="validation-message-color">{errors.password?.message}</p>
        <Form.Group controlId="confirmPassword">
          <Form.Label>{strings["Confirm Password"]}</Form.Label>
          <Form.Control
            type="password"
            {...register("confirmPassword")}
            placeholder={strings["Enter confirm password"]}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <p className="validation-message-color">
          {errors.confirmPassword?.message}
        </p>
        <Button type="submit" variant="primary">
          {strings["Update"]}
        </Button>
      </Form>
    </>
  );
};

export default ChangePasswordForm;
