import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useExchangeContactMutation } from '@/store/user';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message?: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().max(25).required('Name is required'),
  email: yup
    .string()
    .email('Enter a valid email')
    .required('Email is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  message: yup.string().max(100),
});

export const ExchangeContactModal = ({
  show,
  setShow,
  userId,
}: any) => {
  const [exchangeContact, { isLoading }] =
    useExchangeContactMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: FormData) => {
    try {
      await exchangeContact({ id: userId, body: data }).unwrap();
      toast.success('Contact exchanged successfully');
      handleClose();
    } catch (error: any) {
      toast.error(
        error?.data?.message ||
          'An error occurred while exchanging contact.'
      );
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Exchange Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <CustomField
            control={control}
            name="name"
            label="Name"
            errors={errors.name}
          />
          <CustomField
            control={control}
            name="email"
            label="Email"
            errors={errors.email}
          />
          <CustomField
            control={control}
            name="phoneNumber"
            label="Phone Number"
            errors={errors.phoneNumber}
          />
          <CustomField
            control={control}
            name="message"
            label="Message"
            as="textarea"
            errors={errors.message}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Exchange'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
