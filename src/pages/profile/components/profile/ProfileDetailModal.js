import React from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { exchangeContact } from "state/ducks/profile/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().max(25).required(),
  email: yup.string().email("Please enter a valid email").required(),
  number: yup
    .mixed()
    .required()
    .test("valid-number", "Please enter a valid number", (value, context) => {
      if (value !== "") {
        return !isNaN(value);
      }
      return true;
    }),
  message: yup.string().max(100).required(),
});

const ProfileDetailModal = ({
  strings,
  setShowExchange,
  profile,
  showExchange,
  user,
}) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleExchange = (data) => {
    console.log(data);
    dispatch(
      exchangeContact(user.id, {
        ...data,
      })
    );
    setShowExchange(false);
  };
  const handleCloseModal = () => {
    reset();
    setShowExchange(false);
  };

  return (
    <>
      <Modal show={showExchange} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {strings["Exchange Contact with"]} {profile.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit(handleExchange)} noValidate>
            <Form.Group controlId="name">
              <Form.Label>{strings["Your Name"]}</Form.Label>
              <Form.Control
                {...register("name")}
                type="text"
                placeholder={strings["Enter name"]}
              ></Form.Control>
            </Form.Group>
            <p className="validation-color">{errors.name?.message}</p>
            <Form.Group controlId="email">
              <Form.Label>{strings["Your Email"]}</Form.Label>
              <Form.Control
                {...register("email")}
                type="text"
                placeholder={strings["Enter email"]}
              ></Form.Control>

              <p className="validation-color">{errors.email?.message}</p>
            </Form.Group>
            <Form.Group controlId="number">
              <Form.Label>{strings["Your Number"]}</Form.Label>
              <Form.Control
                {...register("number")}
                type="text"
                placeholder={strings["Enter number"]}
              ></Form.Control>
            </Form.Group>

            <p className="validation-color">{errors.number?.message}</p>
            <Form.Group controlId="message">
              <Form.Label>{strings["Message"]}</Form.Label>
              <Form.Control
                {...register("message")}
                type="text"
                placeholder={strings["Enter message"]}
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
