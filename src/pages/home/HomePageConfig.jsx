import EditProfilePage from "../profile/EditProfilePage";
import HomePage from "./HomePage";
import ProfilePage from "../profile/ProfilePage";
import QRPage from "../qr/QRPage";

export const HomePageConfig = {
  routes: [
    {
      path: "/",
      exact: true,
      component: HomePage,
    },
    {
      path: "/profile",
      exact: true,
      component: EditProfilePage,
    },
    {
      path: "/qr",
      exact: true,
      component: QRPage,
    },
    {
      path: "/:username",
      exact: true,
      component: ProfilePage,
    },
  ],
};
