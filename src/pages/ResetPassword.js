import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert, Col, Container } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from './components/Message';
import Loader from './components/Loader';
import FormContainer from './components/FormContainer';
import { resetPassword } from 'state/ducks/auth/actions';
import * as types from 'state/ducks/auth/types';

const ResetPassword = ({ location, history }) => {
  const query = new URLSearchParams(location.search);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { success, error, loading } = useSelector((state) => state.auth);

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
      <div className="bg-black text-center">
        <a href="chapysocial.com">
          <p
            className="text-white"
            style={{ fontSize: '1.4rem', padding: '0.5rem 0' }}
          >
            chapysocial.com
          </p>
        </a>
      </div>
      {!success ? (
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
      ) : (
        <FormContainer>
          <Alert variant="success">
            <Alert.Heading>Password Updated!</Alert.Heading>
            <p>
              Your password has been changed successfully. Use your new password
              to log in.
            </p>
          </Alert>
        </FormContainer>
      )}
    </Fragment>
  );
};

export default ResetPassword;
