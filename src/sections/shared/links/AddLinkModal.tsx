import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  useCreateLinkMutation,
  useUpdateLinkMutation,
} from '@/store/link';
import Image from 'next/image';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { isNullOrEmpty } from '@/utils/helpers';
import { getPlatformImageUrl } from '@/utils/image-helpers';
import { toast } from 'react-toastify';
import CustomPhoneField from '@/components/custom-phone-field';
import ContactLinksList from './ContactLinksList';

interface FormData {
  value: string;
  file?: FileList;
}

const schema = yup.object().shape({
  value: yup.string().required(),
  file: yup.mixed(),
});

interface AddLinkModalParams {
  show: boolean;
  setShow: any;
  profile: any;
  platform: any;
  link?: any;
  links: any[];
}

export const AddLinkModal = ({
  show,
  setShow,
  profile,
  platform,
  link,
  links,
}: AddLinkModalParams) => {
  const hideValue =
    platform?.type === 'contact' || platform?.type === 'file';

  const [createLink, { isLoading: createLoading }] =
    useCreateLinkMutation();
  const [updateLink, { isLoading: updateLoading }] =
    useUpdateLinkMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      value: platform?.type === 'contact' ? profile?.id : link?.value,
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    const body = {
      ...data,
      file: data.file ? data.file[0] : undefined,
    };
    try {
      if (link) {
        await updateLink({
          id: link.id,
          body,
        }).unwrap();
      } else {
        await createLink({
          profile: profile.id,
          platform: platform.id,
          ...body,
        }).unwrap();
      }
      toast.success('Link updated');

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
          {platform?.type === 'phone' ? (
            <CustomPhoneField
              control={control}
              name="value"
              label="Value"
              errors={errors}
              hidden={hideValue}
            />
          ) : (
            <CustomField
              control={control}
              name="value"
              label="Value"
              errors={errors}
              hidden={hideValue}
            />
          )}
          {platform?.type === 'file' && (
            <CustomField
              control={control}
              name="image"
              label="Image"
              type="file"
              accept="image/*"
              errors={errors}
              setValue={setValue}
            />
          )}
          {platform?.type === 'contact' && links && (
            <ContactLinksList
              links={links.filter(
                (l) => l.platform.type !== 'contact'
              )}
            />
          )}
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
