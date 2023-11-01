import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { titleRegex, urlRegex } from '@/core/utils/regex';
import CustomField from '@/core/components/custom-field';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { getPlatformImageUrl } from '@/core/utils/image-helpers';
import {
  useAddLinkMutation,
  useUpdateLinkMutation,
} from '@/store/link';
import { toast } from 'react-toastify';
import Loader from '@/core/components/loader';
import Image from 'next/image';

interface FormData {
  value: string;
}

const schema = yup.object().shape({
  value: yup.string().required(),
});

export const AddLinkModal = ({
  show,
  setShow,
  profileId,
  platform,
  link,
}: any) => {
  const [createLink, { isLoading: createLoading }] =
    useAddLinkMutation();
  const [updateLink, { isLoading: updateLoading }] =
    useUpdateLinkMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: link,
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    try {
      if (link) {
        await updateLink({
          id: link.id,
          body: data,
        }).unwrap();
        toast.success('Link updated');
      } else {
        console.log({
          body: {
            profile: profileId,
            platform: platform.id,
            ...data,
          },
        });

        await createLink({
          profile: profileId,
          platform: platform.id,
          ...data,
        }).unwrap();
        toast.success('Link added');
      }
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
            {link ? 'Update Link' : 'Add Link'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <Image
            src={getPlatformImageUrl(platform)}
            alt="platform"
            className="  m-3"
            height={100}
            width={100}
          />
          <h4>{(link?.title || platform?.title) ?? ''}</h4>
          <p>{(link?.headline || platform?.headline) ?? ''}</p>
          <CustomField
            control={control}
            name="value"
            label="Value"
            errors={errors.value}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            variant="primary"
            disabled={createLoading || updateLoading}
          >
            {createLoading || updateLoading ? (
              <Loader />
            ) : link ? (
              'Update'
            ) : (
              'Add'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
