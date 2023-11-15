import Link from 'next/link';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';

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
              <Link href="/">
                <Button>Home</Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

NotFound.authGuard = false;

export default NotFound;
