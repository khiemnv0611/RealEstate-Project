import path from "./path";
import { RiDashboardLine } from "react-icons/ri";
import { FaProjectDiagram } from "react-icons/fa";
import { FaHouseChimneyUser } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa6";
import { MdAddCard } from "react-icons/md";
import { FaUser, FaUserTag, FaBuildingUser } from "react-icons/fa6";
import { IoIosSettings } from "react-icons/io";

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
  {
    id: 11,
    name: "Các dự án yêu thích",
    path: `/${path.USER_LAYOUT}/${path.WISHLIST}`,
    icon: <FaRegHeart size={25} />,
    type: "SINGLE",
  },
  {
    id: 12,
    name: "Lịch sử giao dịch",
    path: `/${path.USER_LAYOUT}/${path.TRANSACTION_HISTORY}`,
    icon: <MdAddCard size={25} />,
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
];

export const showOptions = [
  {
    id: 1,
    name: "Cá nhân",
    code: "ROL7",
    path: `/${path.USER_LAYOUT}/${path.PERSONAL}`,
    icon: <FaUser />,
  },
  {
    id: 2,
    name: "Môi giới",
    code: "ROL5",
    path: `/${path.AGENT_LAYOUT}/${path.AGENT_DASHBOARD}`,
    icon: <FaUserTag />,
  },
  {
    id: 3,
    name: "Chủ sở hữu",
    code: "ROL3",
    path: `/${path.OWNER_LAYOUT}/${path.OWNER_DASHBOARD}`,
    icon: <FaBuildingUser />,
  },
  {
    id: 4,
    name: "Quản trị viên",
    code: "ROL1",
    path: `/${path.ADMIN_LAYOUT}/${path.ADMIN_DASHBOARD}`,
    icon: <IoIosSettings />,
  },
];

export const cityDistricts = {
  "Thành phố Hồ Chí Minh": {
    "Quận 1": ["Phường 1", "Phường 2"],
    "Quận 2": ["Phường 3", "Phường 4"],
    "Quận 3": ["Phường 6", "Phường 8"],
    "Bình Tân": ["Phường 5", "Phường 6"],
    "Quận 7": ["Phường 9", "Phường 10"],
    "Thủ Đức": ["Phường Linh Chiểu", "Phường Linh Đông"],
    "Quận 8": ["Phường 1", "Phường 3"],
    "Nhà Bè": ["Xã Phú Xuân", "Xã Long Thới"],
    "Gò Vấp": ["Phường 3", "Phường 4"],
  },
  "Hà Nội": {
    "Hoàn Kiếm": ["Phường 1", "Phường 2"],
    "Ba Đình": ["Phường 3", "Phường 4"],
    "Hai Bà Trưng": ["Phường 5", "Phường 6"],
    "Cầu Giấy": ["Phường Dịch Vọng", "Phường Nghĩa Tân"],
    "Đống Đa": ["Phường 7", "Phường 8"],
  },
  "Đà Nẵng": {
    "Hải Châu": ["Phường 1", "Phường 2"],
    "Sơn Trà": ["Phường 3", "Phường 4"],
    "Thanh Khê": ["Phường 5", "Phường 6"],
    "Ngũ Hành Sơn": ["Phường Hòa Hải", "Phường Mỹ An"],
  },
  "Cần Thơ": {
    "Ninh Kiều": ["Phường 1", "Phường 2"],
    "Bình Thủy": ["Phường 3", "Phường 4"],
    "Cái Răng": ["Phường 5", "Phường 6"],
  },
  "Hải Phòng": {
    "Lê Chân": ["Phường 1", "Phường 2"],
    "Hồng Bàng": ["Phường 3", "Phường 4"],
    "Ngô Quyền": ["Phường 5", "Phường 6"],
  },
  "Biên Hòa": {
    "Tân Phú": ["Phường 1", "Phường 2"],
    "Tân Biên": ["Phường 3", "Phường 4"],
    "Long Bình": ["Phường 5", "Phường 6"],
  },
  Huế: {
    "Phú Nhuận": ["Phường 1", "Phường 2"],
    "Vĩnh Ninh": ["Phường 3", "Phường 4"],
    "Thuận Thành": ["Phường 5", "Phường 6"],
  },
  "Nha Trang": {
    "Lộc Thọ": ["Phường 1", "Phường 2"],
    "Phước Hòa": ["Phường 3", "Phường 4"],
    "Vĩnh Nguyên": ["Phường 5", "Phường 6"],
  },
  "Long An": {
    "Tân An": ["Phường 1", "Phường 2"],
    "Bến Lức": ["Thị trấn Bến Lức", "Xã Nhựt Chánh"],
  },
};

export const stripeKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
