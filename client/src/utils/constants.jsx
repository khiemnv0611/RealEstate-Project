import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";

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
];

export const adminSidebar = [
  {
    id: 10,
    name: "Bảng điều khiển",
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
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

export const userSidebar = [
  {
    id: 10,
    name: "Thông tin cá nhân",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
    icon: <FaHouseChimneyUser size={25} />,
    type: "SINGLE",
  },
];

export const ownerSidebar = [
  {
    id: 10,
    name: "Quản lý dự án",
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`,
    icon: <RiDashboardLine size={25} />,
    type: "SINGLE",
  },
  {
    id: 11,
    name: "Các dự án yêu thích",
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_WISHLIST}`,
    icon: <FaRegHeart size={25} />,
    type: "SINGLE",
  },
];

export const showOptions = [
  {
    id: 1,
    name: "Cá nhân",
    code: "ROL7",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
  },
  {
    id: 2,
    name: "Môi giới",
    code: "ROL5",
    path: `/${path.AGENT_LAYOUT}/${path.AGENT_DASHBOARD}`,
  },
  {
    id: 3,
    name: "Chủ sở hữu",
    code: "ROL3",
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`,
  },
  {
    id: 4,
    name: "Quản trị viên",
    code: "ROL1",
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
  },
];
