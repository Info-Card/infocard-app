import React from "react";
import { Button } from "react-bootstrap";

const ProfileDetailsHeader = () => {
  return (
    <>
      <style>
        {`
            .header-container img{
              margin-left: 12px; 
            }
            .header-container a {
              margin-right: 12px;
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
