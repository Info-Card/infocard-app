import NotFound from "./NotFound";
import PrivateProfile from "./PrivateProfile";

export const ErrorPageConfig = {
  routes: [
    {
      path: "/not-found",
      exact: true,
      component: NotFound,
    },
    {
      path: "/private-profile",
      exact: true,
      component: PrivateProfile,
    },
  ],
};
