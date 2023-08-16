import React from "react";
import { Button, Col } from "react-bootstrap";

const ExchangeButton = ({ profile, strings, setShowExchange }) => {
  return (
    <>
      <Col xs={6}>
        <Button
          type="submit"
          id="save-contact-text-adjustment"
          style={{
            backgroundColor: profile.color ?? "grey",
            color: "white",
            width: "100%",
            border: `2px solid ${profile.color ?? "grey"}`,
          }}
          onClick={(e) => {
            setShowExchange(true);
          }}
        >
          {strings["Exchange"]}
        </Button>
      </Col>
    </>
  );
};

export default ExchangeButton;
