import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { useUpdateTagMutation } from '@/store/tag';

interface FormData {
  name: string;
}

const schema = yup.object().shape({
  name: yup.string().required(),
});

export const UpdateTagModal = ({ show, setShow, tag }: any) => {
  const [updateTag, { isLoading }] = useUpdateTagMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: tag?.name || '',
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      await updateTag({
        id: tag.id,
        body: data,
      }).unwrap();
      toast.success('Tag updated');
      handleClose();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Update Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <CustomField
            control={control}
            name="name"
            label="Name"
            errors={errors.name}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : 'Update'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
