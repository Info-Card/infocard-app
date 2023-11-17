import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { titleRegex, urlRegex, youtubeUrlRegex } from '@/utils/regex';
import { useUpdateProfileMutation } from '@/store/profile';

interface FormData {
  url: string;
}

const schema = yup.object().shape({
  url: yup
    .string()
    .required()
    .matches(youtubeUrlRegex, 'please enter a valid url'),
});

export const AddVideoModal = ({
  show,
  setShow,
  index,
  profile,
  refetch,
}: any) => {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      url: profile?.videos[index] || '',
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      let videos = [...(profile.videos || [])];
      if (index >= 0) {
        videos[index] = data.url;
      } else {
        videos = [...videos, data.url];
      }
      await updateProfile({
        id: profile.id,
        body: { videos },
      }).unwrap();
      refetch();
      toast.success('Profile updated');
      handleClose();
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Modal.Header closeButton>
          <Modal.Title>
            {index ? 'Update Video' : 'Add Video'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <CustomField
            control={control}
            name="url"
            label="URL"
            errors={errors.url}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            {isLoading ? <Loader /> : index ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
