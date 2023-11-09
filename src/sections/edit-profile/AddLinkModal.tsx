import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useCreateLinkMutation,
  useUpdateLinkMutation,
} from '@/store/link';
import { toast } from 'react-toastify';
import Image from 'next/image';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { isNullOrEmpty } from '@/utils/helpers';
import { getPlatformImageUrl } from '@/utils/image-helpers';

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
    useCreateLinkMutation();
  const [updateLink, { isLoading: updateLoading }] =
    useUpdateLinkMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      value: link?.value,
    },
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
            src={getPlatformImageUrl(
              isNullOrEmpty(link?.image) ? platform : link
            )}
            alt="platform"
            className="  m-3"
            height={100}
            width={100}
          />
          <h4>
            {(isNullOrEmpty(link?.title)
              ? platform?.title
              : link?.title) ?? ''}
          </h4>
          <p>
            {(isNullOrEmpty(link?.headline)
              ? platform?.headline
              : link?.headline) ?? ''}
          </p>
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
