import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from 'components/Message';
import Loader from 'components/Loader';
import FormContainer from 'components/FormContainer';
import { register } from 'state/ducks/auth/actions';
import { multilanguage } from 'redux-multilanguage';

const RegisterPage = ({ location, history, strings }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  const { loading, error, user: authUser } = useSelector((state) => state.auth);
  const { tag } = useSelector((state) => state.tags);
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (authUser || !tag) {
      history.push(redirect);
    }
  }, [history, authUser, redirect, tag]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register({ username, email, password }));
    }
  };

  return (
    <FormContainer>
      <h1>{strings['Sign Up']}</h1>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>{strings['Username']}</Form.Label>
          <Form.Control
            type="username"
            placeholder={strings['Enter Username']}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>{strings['Email Address']}</Form.Label>
          <Form.Control
            type="email"
            placeholder={strings['Enter email']}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>{strings['Password']}</Form.Label>
          <Form.Control
            type="password"
            placeholder={strings['Enter password']}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword">
          <Form.Label>{strings['Confirm Password']}</Form.Label>
          <Form.Control
            type="password"
            placeholder={strings['Confirm password']}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings['Sign Up']}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          {strings['Have an Account?']}{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            {strings['Login']}
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default multilanguage(RegisterPage);
