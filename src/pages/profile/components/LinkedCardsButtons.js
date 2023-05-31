import React from "react";
import { Button } from "react-bootstrap";
import { unlinkTag } from "state/ducks/tags/actions";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

const LinkedCardsButtons = ({ strings, tag, setSelectedTag }) => {
  const dispatch = useDispatch();
  return (
    <>
      <Button
        style={{
          width: "60px",
        }}
        className="btn-sm mr-2"
        variant="primary"
        onClick={(e) => {
          setSelectedTag(tag);
        }}
      >
        {strings["Edit"]}
      </Button>
      <Button
        style={{
          width: "60px",
          justifyContent: "center",
        }}
        className="btn-sm d-flex text-center"
        variant="danger"
        onClick={(e) =>
          Swal.fire({
            title: "<strong>Warning</strong>",
            icon: "warning",
            html: "Are you sure you want to unlink this card?",
            showCloseButton: true,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(unlinkTag(tag.id));
            }
          })
        }
      >
        {strings["UnLink"]}
      </Button>
    </>
  );
};

export default LinkedCardsButtons;
