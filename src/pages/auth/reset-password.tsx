import Link from 'next/link';
import { Form, Button, Alert } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormContainer from '@/components/form-container';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
import { toast } from 'react-toastify';
import Loader from '@/components/loader';
import { useResetPasswordMutation } from '@/store/auth';
import { useRouter } from 'next/router';
import { useState } from 'react';

interface FormData {
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .required('confirm password is a required field')
    .oneOf([yup.ref('password')], 'confirm password must match'),
});

const ResetPasswordPage = () => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const { token } = router.query;

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    try {
      await resetPassword({
        token: token,
        body: { password: data.password },
      }).unwrap();
      toast.success(
        'password resent successfully. Kindly login again.'
      );
      setSuccess(true);
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const handleGoBack = () => {
    router.replace('/auth/login');
  };

  return (
    <>
      {success ? (
        <FormContainer>
          <Alert variant="success">
            <Alert.Heading>Password Updated!</Alert.Heading>
            <p>
              Your password has been changed successfully. Use your
              new password to log in.
            </p>
          </Alert>
          <Button variant="primary" onClick={handleGoBack}>
            Go to Login
          </Button>
        </FormContainer>
      ) : (
        <FormContainer>
          {isLoading && <Loader />}
          <h1>Reset Password</h1>
          <p>
            Just need to confirm your password to send you
            instructions to reset your password.
          </p>
          <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
            <CustomField
              control={control}
              name="password"
              label="password"
              type="password"
              errors={errors}
            />
            <CustomField
              control={control}
              name="confirmPassword"
              label="confirm password"
              type="password"
              errors={errors}
            />
            <br />
            <Button type="submit" variant="primary">
              Reset password
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

ResetPasswordPage.getLayout = (page: any) => (
  <AuthLayout>{page}</AuthLayout>
);
ResetPasswordPage.authGuard = false;

export default ResetPasswordPage;
