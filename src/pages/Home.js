import React, { Fragment } from 'react';

import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="">Info Card</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
          </Nav>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default Home;
