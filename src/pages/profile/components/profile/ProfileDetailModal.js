import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { exchangeContact } from "state/ducks/profile/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().max(25).required(),
  email: yup.string().email().required(),
  number: yup.string().max(12),
  message: yup.string().max(100),
});

const ProfileDetailModal = ({
  strings,
  setShowExchange,
  profile,
  showExchange,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
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
          <Form onSubmit={handleSubmit(handleExchange)}>
            <Form.Group controlId="name">
              <Form.Label>{strings["Your Name"]}</Form.Label>
              <Form.Control
                {...register("name")}
                type="name"
                placeholder={strings["Enter name"]}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <p className="validation-color">{errors.name?.message}</p>
            <Form.Group controlId="email">
              <Form.Label>{strings["Your Email"]}</Form.Label>
              <Form.Control
                {...register("email")}
                type="email"
                placeholder={strings["Enter email"]}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              ></Form.Control>

              <p className="validation-color">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>{strings["Your Number"]}</Form.Label>
              <Form.Control
                {...register("number")}
                type="text"
                placeholder={strings["Enter number"]}
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
              ></Form.Control>
            </Form.Group>

            <p className="validation-color">{errors.number?.message}</p>
            <Form.Group controlId="message">
              <Form.Label>{strings["Message"]}</Form.Label>
              <Form.Control
                {...register("message")}
                type="text"
                placeholder={strings["Enter message"]}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              ></Form.Control>
            </Form.Group>
            <p className="validation-color">{errors.message?.message}</p>
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
