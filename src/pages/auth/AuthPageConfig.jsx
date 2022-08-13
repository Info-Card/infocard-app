import ChangePasswordPage from './ChangePasswordPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import ResetPasswordPage from './ResetPasswordPage';

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
    {
      path: '/forgot-password',
      exact: true,
      component: ForgotPasswordPage,
    },
    {
      path: '/reset-password',
      exact: true,
      component: ResetPasswordPage,
    },
    {
      path: '/change-password',
      exact: true,
      component: ChangePasswordPage,
    },
  ],
};
