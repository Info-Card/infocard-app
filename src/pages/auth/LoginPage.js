import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from 'components/Message';
import Loader from 'components/Loader';
import FormContainer from 'components/FormContainer';
import { login } from 'state/ducks/auth/actions';
import { multilanguage } from 'redux-multilanguage';

const LoginPage = ({ location, history, strings }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const { loading, error, user: authUser } = useSelector((state) => state.auth);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (authUser) {
      history.push(redirect);
    }
  }, [history, authUser, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <FormContainer>
      <h1>{strings['Sign In']}</h1>
      {error && <Message variant="danger">{error}</Message>}
      <Form onSubmit={submitHandler}>
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
        <Link to="/forgot-password" className="float-right">
          {strings['forgot password?']}
        </Link>
        <br />
        <Button type="submit" variant="primary">
          {loading ? <Loader /> : strings['Sign In']}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default multilanguage(LoginPage);
