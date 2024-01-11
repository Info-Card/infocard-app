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
  const router = useRouter();
  const { token } = router.query;
  const [resetPassword, { isLoading, isSuccess }] =
    useResetPasswordMutation();

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
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      {isSuccess ? (
        <FormContainer>
          <Alert variant="success">
            <Alert.Heading>Password Updated!</Alert.Heading>
            <p>
              Your password has been changed successfully. Use your
              new password to log in.
            </p>
          </Alert>
          <Button variant="primary" href="/auth/login">
            Go to Login
          </Button>
        </FormContainer>
      ) : (
        <FormContainer>
          <h1>Reset Password</h1>
          <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
            <CustomField
              control={control}
              name="password"
              label="Password"
              type="password"
              errors={errors}
            />
            <CustomField
              control={control}
              name="confirmPassword"
              label="Confirm password"
              type="password"
              errors={errors}
            />
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
