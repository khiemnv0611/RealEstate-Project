import {
  AboutUs,
  AddPost,
  Home,
  OurAgents,
  Properties,
  PropertyDetail,
  PublicLayout,
} from "~/pages/public";
import path from "./path";
import App from "~/App";
import {
  AdminLayout,
  CreatePropertyType,
  AdminDashboard,
  ManagePropertyType,
} from "~/pages/admin";
import { Personal, WishList, UserLayout, Deposit } from "~/pages/user";
import { OwnerLayout, OwnerDashboard } from "~/pages/owner";
import AuthCallback from "~/components/login/AuthCallback";
import AuthFailure from "~/components/login/AuthFailure";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: path.PUBLIC_LAYOUT,
        element: <PublicLayout />,
        children: [
          {
            path: path.HOME,
            element: <Home />,
          },
          {
            path: path.ABOUT_US,
            element: <AboutUs />,
          },
          {
            path: path.OUR_AGENTS,
            element: <OurAgents />,
          },
          {
            path: path.PROPERTIES,
            element: <Properties />,
          },
          {
            path: path.PROPERTY_DETAIL__ID,
            element: <PropertyDetail />,
          },
          {
            path: path.ADD_POST,
            element: <AddPost />,
          },
          {
            path: path.AUTH_CALLBACK,
            element: <AuthCallback />,
          },
          {
            path: path.AUTH_FAILURE,
            element: <AuthFailure />,
          },
        ],
      },
      {
        path: path.ADMIN_LAYOUT,
        element: <AdminLayout />,
        children: [
          {
            path: path.ADMIN_DASHBOARD,
            element: <AdminDashboard />,
          },
          {
            path: path.CREATE_PROPERTY_TYPE,
            element: <CreatePropertyType />,
          },
          {
            path: path.MANAGE_PROPERTY_TYPE,
            element: <ManagePropertyType />,
          },
        ],
      },
      {
        path: path.USER_LAYOUT,
        element: <UserLayout />,
        children: [
          {
            path: path.PERSONAL,
            element: <Personal />,
          },
          {
            path: path.WISHLIST,
            element: <WishList />,
          },
          {
            path: path.DEPOSIT,
            element: <Deposit />,
          },
        ],
      },
      {
        path: path.OWNER_LAYOUT,
        element: <OwnerLayout />,
        children: [
          {
            path: path.OWNER_DASHBOARD,
            element: <OwnerDashboard />,
          },
        ],
      },
    ],
  },
];

export default routes;
