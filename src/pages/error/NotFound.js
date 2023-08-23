import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  const location = useLocation();
  const isNotFoundUrl = location.pathname.endsWith("/not-found");
  return (
    <Container>
      <Row>
        {!isNotFoundUrl ? (
          <Col md={12}>
            <div className="text-center mt-5">
              <h1>Oops!</h1>
              <h2>This Profile is Private</h2>
              <div className="">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div className="mt-5">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </div>
            </div>
          </Col>
        ) : (
          <Col md={12}>
            <div className="text-center mt-5">
              <h1>Oops!</h1>
              <h2>404 Not Found</h2>
              <div className="">
                Sorry, an error has occured, Requested page not found!
              </div>
              <div className="mt-5">
                <Link to="/">
                  <Button>Home</Button>
                </Link>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default NotFound;
