import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";

export const navigations = [
  {
    id: 1,
    path: "/",
    text: "TRANG CHỦ",
  },
  {
    id: 2,
    path: `/${path.ABOUT_US}`,
    text: "GIỚI THIỆU",
  },
  {
    id: 3,
    path: `/${path.OUR_AGENTS}`,
    text: "MÔi GIỚI",
  },
  {
    id: 4,
    path: `/${path.PROPERTIES}`,
    text: "DỰ ÁN",
  },
  {
    id: 5,
    path: `/${path.SEARCH}`,
    text: "TÌM KIẾM",
  },
];

export const adminSidebar = [
  {
    id: 10,
    name: "Bảng điều khiển",
    path: `/${path.ADMIN_LAYOUT}/${path.DASHBOARD}`,
    icon: <RiDashboardLine size={25} />,
    type: "SINGLE",
  },
  {
    id: 11,
    name: "Loại dự án",
    icon: <FaProjectDiagram size={25} />,
    type: "PARENT",
    subs: [
      {
        id: 111,
        path: `/${path.ADMIN_LAYOUT}/${path.CREATE_PROPERTY_TYPE}`,
        name: "Tạo mới",
      },
      {
        id: 112,
        path: `/${path.ADMIN_LAYOUT}/${path.MANAGE_PROPERTY_TYPE}`,
        name: "Quản lý",
      },
    ],
  },
];
