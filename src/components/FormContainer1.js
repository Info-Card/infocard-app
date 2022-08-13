import React from 'react';
import { Row, Col } from 'react-bootstrap';

const FormContainer1 = ({ children }) => {
  return (
    <Row className="justify-content-md-center mt-5">
      <Col xs={12}>{children}</Col>
    </Row>
  );
};

export default FormContainer1;
