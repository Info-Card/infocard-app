import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

import FormContainer from '@/core/components/form-container';
import CustomField from '@/core/components/custom-field';
import Loader from '@/core/components/loader';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { setCredentials } from '@/store/auth';
import { useLoginMutation } from '@/store/user';
import { useAuth } from '@/hooks/useAuth';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const userInfo = useAuth();

  const redirect = searchParams?.get('redirect') || '/';

  const [login, { isLoading }] = useLoginMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (userInfo) {
      router.push(redirect);
    }
  }, [router, redirect, userInfo]);

  const onSubmitHandler = async (data: FormData) => {
    try {
      const res: any = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      router.push(redirect);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit(onSubmitHandler)} noValidate>
        <CustomField
          control={control}
          name="email"
          label="Email"
          errors={errors.email}
        />
        <CustomField
          control={control}
          name="password"
          label="Password"
          type="password"
          errors={errors.password}
        />
        <Link
          href="/forgot-password"
          className="float-right"
          style={{ color: 'black' }}
        >
          Forgot password?
        </Link>
        <br />
        <Button type="submit" variant="primary" disabled={isLoading}>
          {isLoading ? <Loader /> : 'Sign In'}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;
