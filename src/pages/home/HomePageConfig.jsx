import EditProfilePage from './EditProfilePage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';

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

// {
//   path: '/:username',
//   exact: true,
//   component: ProfilePage,
// },
