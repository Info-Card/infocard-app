import React from "react";
import { Button, Col } from "react-bootstrap";

const SaveContectButton = ({ profile, strings }) => {
  return (
    <>
      <Col xs={6}>
        <a href={`https://api.infocard.me/v1/profile/contact/${profile.id}`}>
          <Button
            type="submit"
            id="save-contact-text-adjustment"
            style={{
              backgroundColor: profile.color ?? "grey",
              color: "white",
              width: "100%",
              border: `2px solid ${profile.color ?? "grey"}`,
            }}
          >
            {strings["Save Contact"]}
          </Button>
        </a>
      </Col>
    </>
  );
};

export default SaveContectButton;
