import LinkPage from "./LinkPage";

export const LinkPageConfig = {
  routes: [
    {
      path: "/links/:platformId",
      exact: true,
      component: LinkPage,
    },
  ],
};
