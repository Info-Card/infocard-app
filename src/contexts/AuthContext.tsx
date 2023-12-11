import {
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
} from '@/store/auth';
import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const defaultProvider = {
  user: undefined,
  isLoading: false,
  login: (params: any) => Promise.resolve(),
  register: (params: any) => Promise.resolve(),
  logout: () => {},
};

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }: any) => {
  const router = useRouter();

  const [user, setUser] = useState<any>();

  const { data, isLoading, refetch } = useGetMeQuery(
    {},
    {
      skip:
        typeof localStorage !== 'undefined'
          ? !localStorage.getItem('user')
          : true,
    }
  );

  const [login, { isLoading: loginLoading }] = useLoginMutation();
  const [register, { isLoading: registerLoading }] =
    useRegisterMutation();

  useEffect(() => {
    if (data) {
      setUser(data);
    } else if (!isLoading) {
      setUser(null);
    }
  }, [data, isLoading]);

  const handleLogin = async (params: any) => {
    try {
      const res: any = await login(params).unwrap();
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('tokens', JSON.stringify(res.tokens));
      const returnUrl = router.query.returnUrl;
      const redirectURL =
        returnUrl && returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL as string);
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }
  };

  const handleRegister = async (params: any) => {
    try {
      const res: any = await register(params).unwrap();
      setUser(res.user);
      localStorage.setItem('user', JSON.stringify(res.user));
      localStorage.setItem('tokens', JSON.stringify(res.tokens));
      const returnUrl = router.query.returnUrl;
      const redirectURL =
        returnUrl && returnUrl !== '/' ? returnUrl : '/';
      router.replace(redirectURL as string);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tokens');
    localStorage.removeItem('user');
    router.push('/auth/login');
  };

  const values = {
    user,
    isLoading: isLoading || loginLoading || registerLoading,
    refetch,
    login: handleLogin,
    register: handleRegister,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
