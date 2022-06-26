import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { logout } from 'state/ducks/auth/actions';

const Header = ({ history }) => {
  const dispatch = useDispatch();

  const { user: authUser } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {/* <img src="logo.png" alt="" style={{ width: '120px' }} /> */}
              info card
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {authUser ? (
                <>
                  <LinkContainer to="/qr">
                    <Nav.Link>
                      <i className="fas fa-qrcode"></i> My QR
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>
                      <i className="fas fa-user"></i> Profile
                    </Nav.Link>
                  </LinkContainer>

                  <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
