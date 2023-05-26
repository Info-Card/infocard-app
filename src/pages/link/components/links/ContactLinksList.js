import React from "react";
import { Col, Row } from "react-bootstrap";
import ContactLinkCard from "./ContactLinkCard";

const ContactLinkList = ({ links }) => {
  if (!links && links.length < 1) {
    return;
  }
  return (
    <Col xs={12}>
      <Row className="g-2 mb-4">
        {links.map((link, key) => {
          if (link.type === "contact") {
            return null;
          }
          return (
            <Col key={key} xs={12}>
              <ContactLinkCard link={link} />
            </Col>
          );
        })}
      </Row>
    </Col>
  );
};

export default ContactLinkList;
