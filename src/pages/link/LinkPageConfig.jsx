import LinkPage from './LinkPage';
import MedicalCardPage from './MedicalCardPage';

export const LinkPageConfig = {
  routes: [
    {
      path: '/links/:linkId',
      exact: true,
      component: LinkPage,
    },
    {
      path: '/medical-card/:linkId',
      exact: true,
      component: MedicalCardPage,
    },
  ],
};
