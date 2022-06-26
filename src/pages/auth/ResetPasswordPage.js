import React, { useState, Fragment, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from 'components/Message';
import Loader from 'components/Loader';
import FormContainer from 'components/FormContainer';
import { resetPassword } from 'state/ducks/auth/actions';
import * as types from 'state/ducks/auth/types';

const ResetPasswordPage = ({ location, history }) => {
  const query = new URLSearchParams(location.search);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      dispatch({ type: types.AUTH_RESET });
      history.push('/login');
    }
  }, [history, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    const token = query.get('token');

    if (confirmPassword === password) {
      dispatch(resetPassword(token, password));
    } else {
      dispatch({
        type: types.AUTH_FAIL,
        payload: "Password doesn't match",
      });
    }
  };

  return (
    <Fragment>
      <FormContainer>
        <h3>Reset Password</h3>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Sign In
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

export default ResetPasswordPage;
