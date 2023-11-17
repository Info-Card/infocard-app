import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/use-auth';
import FormContainer from '@/components/form-container';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
import { useForgotPasswordMutation } from '@/store/auth';
import { toast } from 'react-toastify';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordPage = () => {
  const [forgotPassword] = useForgotPasswordMutation();

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
      await forgotPassword(data).unwrap();
      toast.success(
        'Email sent successfully. Kindly check your mailbox.'
      );
      reset();
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Forgot Password</h1>
      <p>
        Just need to confirm your email to send you instructions to
        reset your password.
      </p>
      <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <CustomField
          control={control}
          name="email"
          label="Email"
          errors={errors}
        />
        <Link
          href="/auth/login"
          style={{
            color: 'black',
            textDecoration: 'none',
            float: 'right',
          }}
        >
          Return to login?
        </Link>
        <br />
        <Button type="submit" variant="primary">
          Send Link
        </Button>
      </Form>
    </FormContainer>
  );
};

ForgotPasswordPage.getLayout = (page: any) => (
  <AuthLayout>{page}</AuthLayout>
);
ForgotPasswordPage.authGuard = false;

export default ForgotPasswordPage;
