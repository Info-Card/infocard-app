import React from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { multilanguage } from "redux-multilanguage";

const ProfileModal = ({ strings }) => {
  const { tag } = useSelector((state) => state.tags);
  const { user: authUser } = useSelector((state) => state.auth);

  return (
    <div>
      <Modal show={tag && !authUser}>
        <Modal.Header closeButton>
          <Modal.Title>{strings["Activate your product"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {
              strings[
                "To Activate your product you need to login or register first"
              ]
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Link to={"/login"}>
            <Button variant="primary">{strings["Login"]}</Button>
          </Link>
          <Link to={"/register"}>
            <Button variant="info">{strings["Register"]}</Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default multilanguage(ProfileModal);
