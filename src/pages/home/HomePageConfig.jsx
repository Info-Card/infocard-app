import EditProfilePage from './EditProfilePage';
import HomePage from './HomePage';

export const HomePageConfig = {
  routes: [
    {
      path: '/',
      exact: true,
      component: HomePage,
    },
    {
      path: '/profile',
      exact: true,
      component: EditProfilePage,
    },
  ],
};
