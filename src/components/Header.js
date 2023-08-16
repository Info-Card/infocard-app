import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { logout } from "state/ducks/auth/actions";
import { multilanguage } from "redux-multilanguage";
const Header = ({ history = [""], strings }) => {
  const dispatch = useDispatch();
  const { user: authUser } = useSelector((state) => state.auth);
  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };
  const [expanded, setExpanded] = useState(false);
  return (
    <header>
      <Navbar
        bg="light"
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/assets/images/logo.png"
                alt=""
                style={{ width: "80px" }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              {authUser ? (
                <NavDropdown title={"Settinggg"} id="username" show={expanded}>
                  <LinkContainer to="/qr">
                    <NavDropdown.Item>
                      <i className="fas fa-qrcode"></i> {strings["My QR"]}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>
                      <i className="fas fa-user"></i> {strings["Profile"]}{" "}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <LinkContainer to="/change-password">
                    <NavDropdown.Item>
                      <i className="fas fa-gear"></i>{" "}
                      {strings["Change Password"]}
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    {strings["Logout"]}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> {strings["Sign In"]}
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
export default multilanguage(Header);
