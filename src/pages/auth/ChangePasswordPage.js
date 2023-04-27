import React, { useState, Fragment, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "components/Message";
import Loader from "components/Loader";
import FormContainer from "components/FormContainer";
import * as types from "state/ducks/users/types";
import MainLayout from "components/MainLayout";
import { updateUser } from "state/ducks/users/actions";
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
const ChangePasswordPage = ({ location, history, strings }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { user: authUser } = useSelector((state) => state.auth);
  const { success, error, loading } = useSelector((state) => state.users);

  const { rehydrated } = useSelector((state) => state._persist);

  useEffect(() => {
    if (rehydrated) {
      if (!authUser) {
        history.push("/login");
      } else if (success) {
        dispatch({ type: types.USER_RESET });
        history.push("/");
      }
    }
  }, [history, success, dispatch, authUser, rehydrated]);

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
    <MainLayout>
      <Fragment>
        <FormContainer>
          <h3>{strings["Change Password"]}</h3>
          {error && <Message variant="danger">{error}</Message>}
          {loading && <Loader />}
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
            <p>{errors.password?.message}</p>
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
            <p>{errors.confirmPassword?.message}</p>
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
    </MainLayout>
  );
};

export default multilanguage(ChangePasswordPage);
