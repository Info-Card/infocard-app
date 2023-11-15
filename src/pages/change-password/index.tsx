import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUpdateUserMutation } from '@/store/user';
import CustomField from '@/components/custom-field';
import FormContainer from '@/components/form-container';
import { MainLayout } from '@/layouts/main/layout';
import Loader from '@/components/loader';

interface FormData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().min(8).max(32).required(),
  confirmPassword: yup
    .string()
    .min(8)
    .max(32)
    .required()
    .oneOf([yup.ref('password')], 'confirm password must match'),
});

const ChangePasswordPage = () => {
  const router = useRouter();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    try {
      await updateUser({ password: data.password }).unwrap();
      toast.success('Password updated successfully');
      router.push('/');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Change Password</h1>
      <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <CustomField
          control={control}
          name="password"
          label="Password"
          type="password"
          errors={errors.password}
        />
        <CustomField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          errors={errors.confirmPassword}
        />
        <br />
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Loader /> : 'Update'}
        </Button>
      </Form>
    </FormContainer>
  );
};

ChangePasswordPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);

export default ChangePasswordPage;
