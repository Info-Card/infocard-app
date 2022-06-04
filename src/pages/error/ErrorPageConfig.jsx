import NotFound from './NotFound';

export const ErrorPageConfig = {
  routes: [
    {
      path: '/not-found',
      exact: true,
      component: NotFound,
    },
  ],
};
