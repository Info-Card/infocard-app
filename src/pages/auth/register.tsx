import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/use-auth';
import FormContainer from '@/components/form-container';
import CustomField from '@/components/custom-field';
import { AuthLayout } from '@/layouts/auth/layout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loader from '@/components/loader';
import { passwordRegex, usernameRegex } from '@/utils/regexUtils';

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Username is a required')
    .matches(
      usernameRegex,
      'Username must be 3-30 characters long and can only contain letters, numbers, underscores, and hyphens.'
    ),
  email: yup
    .string()
    .required('Email is a required')
    .email('Email must be a valid email'),
  password: yup
    .string()
    .required('Password is a required')
    .matches(
      passwordRegex,
      'Password must be at least 8 characters long and contain at least 1 letter and 1 number.'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is a required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

const RegisterPage = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = async (data: FormData) => {
    register({
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('tag')) {
      router.replace('/auth/login');
    }
  }, [router]);

  return (
    <FormContainer>
      {isLoading && <Loader />}
      <h1>Sign Up</h1>
      <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <CustomField
          control={control}
          name="username"
          label="Username"
          errors={errors}
        />
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
        <CustomField
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          errors={errors}
        />
        <div className="d-flex justify-content-end">
          Already have an account?&nbsp;
          <Link
            href="/auth/forgot-password"
            className="float-right"
            style={{ color: 'black' }}
          >
            Sign In
          </Link>
        </div>
        <br />
        <Button type="submit" variant="primary" disabled={isLoading}>
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  );
};

RegisterPage.getLayout = (page: any) => (
  <AuthLayout>{page}</AuthLayout>
);
RegisterPage.authGuard = false;

export default RegisterPage;
