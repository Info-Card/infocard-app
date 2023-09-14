import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { logout } from "state/ducks/auth/actions";
import { multilanguage } from "redux-multilanguage";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Header = ({ strings }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user: authUser } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    history.push("/login");
  };

  return (
    <header>
      <Navbar bg="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/assets/images/logo.png"
                alt=""
                style={{ width: "60px" }}
              />
            </Navbar.Brand>
          </LinkContainer>
          <div className="ml-auto">
            {authUser ? (
              <DropdownButton
                title={"Settings"}
                drop="left"
                variant="light"
                size="md"
              >
                <LinkContainer to="/qr">
                  <Dropdown.Item>
                    <i className="fas fa-qrcode"></i> {strings["My QR"]}
                  </Dropdown.Item>
                </LinkContainer>
                <LinkContainer to="/profile">
                  <Dropdown.Item>
                    <i className="fas fa-user"></i> {strings["Profile"]}{" "}
                  </Dropdown.Item>
                </LinkContainer>
                <Dropdown.Divider />
                <LinkContainer to="/change-password">
                  <Dropdown.Item>
                    <i className="fas fa-gear"></i>
                    {strings["Change Password"]}
                  </Dropdown.Item>
                </LinkContainer>
                <Dropdown.Item onClick={logoutHandler}>
                  {strings["Logout"]}
                </Dropdown.Item>
              </DropdownButton>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> {strings["Sign In"]}
                </Nav.Link>
              </LinkContainer>
            )}
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default multilanguage(Header);
