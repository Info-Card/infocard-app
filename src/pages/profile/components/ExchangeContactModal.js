import React from "react";
import { multilanguage } from "redux-multilanguage";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { exchangeContact } from "state/ducks/users/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomTextField from "components/CustomTextField";

const schema = yup.object().shape({
  name: yup.string().max(25).required(),
  email: yup.string().email("Please enter a valid email").required(),
  number: yup
    .string()
    .required("Number is required")
    .test("valid-number", "Please enter a valid number", (value, context) => {
      if (value !== "") {
        return !isNaN(value);
      }
      return true;
    }),
  message: yup.string().max(100).required(),
});

const ExchangeContactModal = ({ strings, show, setShow, profile, user }) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleExchange = (data) => {
    dispatch(exchangeContact(user.id, data));
    handleCloseModal();
  };

  const handleCloseModal = () => {
    reset();
    setShow(false);
  };

  return (
    <Modal show={show} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>
          {strings["Exchange Contact with"]} {profile.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(handleExchange)} noValidate>
          <CustomTextField
            id="name"
            label="Name"
            placeholder="John Doe"
            error={errors.name}
            control={control}
          />
          <CustomTextField
            id="email"
            label="Email"
            placeholder="abc@example.com"
            error={errors.email}
            control={control}
          />
          <CustomTextField
            id="number"
            label="Number"
            placeholder="xxx xxx xxx"
            error={errors.number}
            control={control}
          />
          <CustomTextField
            id="message"
            label="Message"
            error={errors.message}
            control={control}
          />
          <Button type="submit" variant="primary">
            {strings["Exchange"]}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default multilanguage(ExchangeContactModal);
