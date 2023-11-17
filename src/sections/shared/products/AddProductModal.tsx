import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/store/product';
import CustomField from '@/components/custom-field';
import Loader from '@/components/loader';
import { titleRegex, urlRegex } from '@/utils/regex';

interface FormData {
  title: string;
  url: string;
  image?: FileList;
}

const schema = yup.object().shape({
  title: yup
    .string()
    .required()
    .matches(titleRegex, 'please enter a valid title'),
  url: yup
    .string()
    .required()
    .matches(urlRegex, 'please enter a valid url'),
  image: yup.mixed(),
});

export const AddProductModal = ({
  show,
  setShow,
  product,
  profileId,
}: any) => {
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading }] =
    useUpdateProductMutation();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: product?.title || '',
      url: product?.url || '',
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => {
    setShow(false);
    reset();
  };

  const onSubmit = async (data: any) => {
    const body = { ...data, image: data.image[0] };
    try {
      if (product) {
        await updateProduct({
          id: product.id,
          body,
        }).unwrap();
        toast.success('Product updated');
      } else {
        await createProduct({
          profile: profileId,
          ...body,
        }).unwrap();
        toast.success('Product added');
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
            {product ? 'Update Custom Link' : 'Add Custom Link'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <CustomField
            control={control}
            name="title"
            label="Title"
            errors={errors}
          />
          <CustomField
            control={control}
            name="url"
            label="URL"
            errors={errors}
          />
          <CustomField
            control={control}
            name="image"
            label="Image"
            type="file"
            accept="image/*"
            errors={errors}
            setValue={setValue}
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
            ) : product ? (
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
