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
import { Personal, UserLayout } from "~/pages/user";
import { OwnerLayout, WishList, OwnerDashboard } from "~/pages/owner";

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
          {
            path: path.OWNER_WISHLIST,
            element: <WishList />,
          },
        ],
      },
    ],
  },
];

export default routes;
