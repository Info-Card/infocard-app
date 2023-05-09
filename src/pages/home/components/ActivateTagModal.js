import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { multilanguage } from "redux-multilanguage";
import { LOGOUT } from "state/ducks/auth/types";
import { linkTag } from "state/ducks/tags/actions";
import { TAG_RESET } from "state/ducks/tags/types";

const ActivateTagModal = ({ strings }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { user: authUser } = useSelector((state) => state.auth);
  const { tag, success: tagSuccess } = useSelector((state) => state.tags);

  const handleClose1 = () => {
    dispatch({ type: TAG_RESET });
  };

  const handleClose = () => {
    localStorage.removeItem("tagId");
    dispatch({ type: TAG_RESET });
  };

  const handleSwitchAccount = () => {
    dispatch({ type: LOGOUT });
    history.push("/register");
  };

  const handleActivateTag = () => {
    dispatch(linkTag(tag.id));
  };

  return (
    <div>
      <Modal show={tag}>
        <Modal.Header closeButton onHide={handleClose}>
          <Modal.Title>{strings["Activate your product"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {
              strings[
                "If you want to link it with current account please select"
              ]
            }{" "}
            <span>
              <strong>
                "{strings["Activate to"]} {authUser.username}"
              </strong>
            </span>{" "}
            {
              strings[
                "or If you want to link it with different account please select 'Switch Account'"
              ]
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSwitchAccount}>
            {strings["Switch Account"]}
          </Button>
          {authUser && (
            <Button variant="primary" onClick={handleActivateTag}>
              {strings["Activate to"]} {authUser.username}
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <Modal show={tagSuccess}>
        <Modal.Header closeButton>
          <Modal.Title>{strings["Activation Completed"]}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {strings["You have successfully activated Info Card"]}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            {strings["Close"]}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default multilanguage(ActivateTagModal);
