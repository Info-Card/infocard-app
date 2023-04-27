import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Container>
      <Row>
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
      </Row>
    </Container>
  );
};

export default NotFound;
