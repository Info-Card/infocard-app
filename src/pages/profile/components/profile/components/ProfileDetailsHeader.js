import React from "react";
import { Button } from "react-bootstrap";

const ProfileDetailsHeader = () => {
  return (
    <>
      <style>
        {`
          @media (max-width: 575px) {
            .header-container img, .header-container a {
              margin-left: 15px; /* Add margin to both sides */
            }
          }
          @media (max-width: 575px) {
            .header-container a {
              margin-right: 15px; /* Add margin to both sides */
            }
          }
        `}
      </style>
      <div className="d-flex align-items-center justify-content-between mt-3 mb-1 header-container">
        <img src="assets/images/logo.png" alt="" style={{ width: "80px" }} />
        <a href={`https://infocard.me`}>
          <Button type="submit" variant="outline-primary">
            Get Your Card
          </Button>
        </a>
      </div>
    </>
  );
};

export default ProfileDetailsHeader;
