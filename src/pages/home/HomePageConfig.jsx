import EditProfilePage from './EditProfilePage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import QRPage from './QRPage';

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
    {
      path: '/qr',
      exact: true,
      component: QRPage,
    },
    {
      path: '/:username',
      exact: true,
      component: ProfilePage,
    },
  ],
};
