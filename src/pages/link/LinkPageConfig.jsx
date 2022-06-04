import LinkPage from './LinkPage';

export const LinkPageConfig = {
  routes: [
    {
      path: '/links/:linkId',
      exact: true,
      component: LinkPage,
    },
  ],
};
