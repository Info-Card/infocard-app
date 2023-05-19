import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { exchangeContact } from "state/ducks/profile/actions";

const ProfileDetailModal = ({
  strings,
  setShowExchange,
  profile,
  showExchange,
}) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    number: "",
  });
  const dispatch = useDispatch();
  const handleExchange = (event) => {
    event.preventDefault();
    console.log(form);
    dispatch(exchangeContact(profile.id, form));
    setForm({ name: "", email: "", message: "", number: "" });
    setShowExchange(false);
  };
  return (
    <>
      <Modal show={showExchange}>
        <Modal.Header closeButton onHide={(e) => setShowExchange(false)}>
          <Modal.Title>
            {strings["Exchange Contact with"]} {profile.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleExchange}>
            <Form.Group controlId="name">
              <Form.Label>{strings["Your Name"]}</Form.Label>
              <Form.Control
                type="name"
                placeholder={strings["Enter name"]}
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              ></Form.Control>
              <Form.Label>{strings["Your Email"]}</Form.Label>
              <Form.Control
                type="email"
                placeholder={strings["Enter email"]}
                value={form.email}
                required
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              ></Form.Control>
              <Form.Label>{strings["Your Number"]}</Form.Label>
              <Form.Control
                type="text"
                placeholder={strings["Enter number"]}
                value={form.number}
                required
                onChange={(e) => setForm({ ...form, number: e.target.value })}
              ></Form.Control>
              <Form.Label>{strings["Message"]}</Form.Label>
              <Form.Control
                type="text"
                placeholder={strings["Enter message"]}
                value={form.message}
                required
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              {strings["Exchange"]}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProfileDetailModal;
