import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/use-auth';
import FormContainer from '@/components/form-container';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const { login } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    login(data);
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <CustomField
          control={control}
          name="email"
          label="Email"
          errors={errors}
        />
        <CustomField
          control={control}
          name="password"
          label="Password"
          type="password"
          errors={errors}
        />
        <Link
          href="/forgot-password"
          className="float-right"
          style={{ color: 'black' }}
        >
          Forgot password?
        </Link>
        <br />
        <Button type="submit" variant="primary">
          Sign In
        </Button>
      </Form>
    </FormContainer>
  );
};

LoginPage.getLayout = (page: any) => <AuthLayout>{page}</AuthLayout>;
LoginPage.authGuard = false;

export default LoginPage;
