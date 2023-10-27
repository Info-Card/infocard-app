import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { titleRegex, urlRegex } from '@/core/utils/regex';
import CustomField from '@/core/components/custom-field';
import CustomFileField from '@/core/components/custom-file-field';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface FormData {
  title: string;
  url: string;
}

const schema = yup.object().shape({
  url: yup
    .string()
    .required()
    .matches(urlRegex, 'please enter a valid url'),
  title: yup
    .string()
    .required()
    .matches(titleRegex, 'please enter a valid title'),
});

export const AddCustomLinkModal = ({ show, setShow, link }: any) => {
  const [image, setImage] = useState(link ? link.image : null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: link,
    resolver: yupResolver(schema),
  });

  // useEffect(() => {
  //   if (success) {
  //     setShow(false);
  //     reset();
  //   }
  // }, [success, reset, setShow]);

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = (data: any) => {};

  const modalTitle = link ? 'Update Custom Link' : 'Add Custom Link';

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate>
          <CustomField
            control={control}
            name="title"
            label="Title"
            errors={errors.title}
          />
          <CustomField
            control={control}
            name="url"
            label="URL"
            errors={errors.url}
          />
          <CustomFileField
            label="Image"
            accept="image/*"
            value={image}
            setFile={setImage}
          />
          <Button type="submit" variant="primary">
            {link ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};
