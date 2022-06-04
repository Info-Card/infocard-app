import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ResetPasswordPage from './ResetPassword';

export const AuthPageConfig = {
  routes: [
    {
      path: '/login',
      exact: true,
      component: LoginPage,
    },
    {
      path: '/register',
      exact: true,
      component: RegisterPage,
    },
    // {
    //   path: '/reset-password',
    //   exact: true,
    //   component: ResetPasswordPage,
    // },
  ],
};
