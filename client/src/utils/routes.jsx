// import {
//   AboutUs,
//   Home,
//   OurAgents,
//   Properties,
//   PublicLayout,
// } from "~/pages/public";
// import path from "./path";
// import App from "~/App";
// import {
//   AdminLayout,
//   CreatePropertyType,
//   Dashboard,
//   ManagePropertyType,
// } from "~/pages/admin";
// import { Personal, UserLayout } from "~/pages/user";

// const routes = [
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       {
//         path: path.PUBLIC_LAYOUT,
//         else: <PublicLayout />,
//         children: [
//           {
//             path: path.HOME,
//             element: <Home />,
//           },
//           {
//             path: path.ABOUT_US,
//             element: <AboutUs />,
//           },
//           {
//             path: path.OUR_AGENTS,
//             element: <OurAgents />,
//           },
//           {
//             path: path.PROPERTIES,
//             element: <Properties />,
//           },
//         ],
//       },
//       {
//         path: path.ADMIN_LAYOUT,
//         else: <AdminLayout />,
//         children: [
//           {
//             path: path.ADMIN_DASHBOARD,
//             element: <Dashboard />,
//           },
//           {
//             path: path.CREATE_PROPERTY_TYPE,
//             element: <CreatePropertyType />,
//           },
//           {
//             path: path.MANAGE_PROPERTY_TYPE,
//             element: <ManagePropertyType />,
//           },
//         ],
//       },
//       {
//         path: path.USER_LAYOUT,
//         else: <UserLayout />,
//         children: [
//           {
//             path: path.PERSONAL,
//             element: <Personal />,
//           },
//         ],
//       },
//     ],
//   },
// ];

// export default routes;
