import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Button, InputForm, InputSelect } from "~/components";
import TablePagination from "@mui/material/TablePagination";
import { apiGetUsers, apiUpdateUserStatus } from "~/apis/user";
import Swal from "sweetalert2";
import { FaCheck } from "react-icons/fa6";

const ManageAccounts = ({ onChangeDataCount }) => {
  const [page, setPage] = useState(0); // Quản lý trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng hàng mỗi trang

  // Xử lý khi chuyển trang
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Xử lý khi thay đổi số hàng trên mỗi trang
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const {
    register,
    formState: { errors },
    watch,
    containerClassname,
  } = useForm();

  const totalRows = 16;
  const [selectedRows, setSelectedRows] = useState([]);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMode, setUserMode] = useState("ALL");
  const [searchName, setSearchName] = useState(""); // Tìm kiếm tên
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      // Nếu userId đã có trong mảng, thì bỏ chọn (xóa khỏi mảng)
      if (prevSelectedRows.includes(userId)) {
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          // Bật lại button cho user vừa bị bỏ chọn
          updatedDisabledButtons[userId] = false;
          return updatedDisabledButtons;
        });
        return [];
      } else {
        // Chọn userId và disable button cho user đó
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          // Bật lại tất cả các button
          for (let i = 0; i < updatedDisabledButtons.length; i++) {
            updatedDisabledButtons[i] = false;
          }
          // Disable button của user được chọn
          updatedDisabledButtons[userId] = true;
          return updatedDisabledButtons;
        });

        return [userId]; // Chỉ chọn 1 user
      }
    });
  };

  useEffect(() => {
    const filtered = users.filter((user) => {
      const roles = user.userRoles.map((role) =>
        role.roleName.value.toLowerCase()
      );

      let filterMode = true;
      // Kiểm tra điều kiện theo từng `userMode`
      if (userMode === "ALL") {
        filterMode = roles.includes("khách hàng") ||
          roles.includes("chủ tài sản") ||
          roles.includes("môi giới")
      }
      if (userMode === "CUSTOMER") {
        filterMode = roles.length === 1 && roles.includes("khách hàng");
      }
      if (userMode === "OWNER") {
        filterMode = roles.includes("chủ tài sản");
      }
      if (userMode === "AGENT") {
        filterMode = roles.includes("môi giới");
      }

      const statusFilter =
        selectedStatus === null || selectedStatus === ""
          ? true
          : user.isAvailable === (selectedStatus === "true");

      return statusFilter && filterMode;
    });
    
    console.log(selectedStatus)
    setFilteredUsers(filtered);
  }, [selectedStatus, userMode, users]);

  // LỌC DANH SÁCH THEO KEYWORDS
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesName = user.name
        .toLowerCase()
        .includes(searchName.toLowerCase());

      return matchesName;
    });

    setFilteredUsers(filtered);
  }, [searchName, users]);

  // GET DATA
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGetUsers();
      if (response) {
        setUsers(response.users);
      }
    };

    fetchUsers();
  }, []);

  // onChangeDataCount(filteredUsers.length)

  // DUYỆT 1 USER
  const handleApprove = async (id, message) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận!",
      text: message,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiUpdateUserStatus(id);
        if (res) {
          Swal.fire("Thành công!", "", "success").then(() => {
            // Tải lại trang sau khi thông báo thành công
            window.location.reload();
          });
        }
      }
    });
  };

  const renderTableHead = () => {
    return (
      <thead className="sticky top-0 bg-gray-200 z-20">
        <tr>
          <th className="sticky left-0 z-10 whitespace-nowrap px-10 py-3">
            <RiCheckboxIndeterminateFill size={20} />
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">STT</th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Tên tài khoản
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">Avatar</th>
          <th className="relative whitespace-nowrap px-10 py-3">Email</th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Số điện thoại
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">Vai trò</th>
          <th className="relative whitespace-nowrap px-10 py-3">Trạng thái</th>
          <th className="relative whitespace-nowrap px-10 py-3">Ngày tạo</th>
          <th className="relative whitespace-nowrap px-10 py-3"></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="bg-white">
        {filteredUsers
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((user, index) => (
            <tr
              key={user.id}
              className={twMerge(
                clsx(
                  "border-b border-gray-200",
                  selectedRows.includes(user.id) ? "bg-blue-200" : "bg-white"
                )
              )}
            >
              <td
                className={twMerge(
                  "sticky left-0 z-10 p-6 text-center whitespace-nowrap border-b",
                  selectedRows.includes(user.id) ? "bg-blue-200" : "bg-white" // Đồng bộ màu nền khi được chọn
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                />
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.id}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.name}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-14 h-14 object-cover bg-gray-500 rounded-full"
                />
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.email}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.phone}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.userRoles.map((role) => role.roleName.value).join(", ")}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                <span
                  className={twMerge(
                    clsx(
                      "font-bold",
                      user.isAvailable ? "text-green-500" : "text-red-500"
                    )
                  )}
                >
                  {user.isAvailable ? "Hoạt động" : "Đã khóa"}
                </span>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td
                className={twMerge(
                  "p-6 text-center whitespace-nowrap sticky right-0 z-10",
                  selectedRows.includes(user.id) ? "bg-blue-200" : "bg-white" // Đồng bộ màu với tr khi được chọn
                )}
              >
                <span
                  className={twMerge(
                    "p-2 border border-gray-400 flex items-center w-fit",
                    clsx({
                      "bg-green-400 cursor-pointer":
                        !user.isAvailable && disabledButtons[user.id], // FaCheck
                      "bg-red-400 cursor-pointer":
                        user.isAvailable && disabledButtons[user.id], // MdDeleteOutline
                      "bg-gray-200 cursor-not-allowed":
                        !disabledButtons[user.id], // Disabled state
                    })
                  )}
                >
                  {user.isAvailable ? (
                    <MdDeleteOutline
                      size={17}
                      onClick={() => {
                        if (disabledButtons[user.id]) {
                          handleApprove(
                            user.id,
                            "Xác nhận khóa tài khoản" // hoặc tùy theo ngữ cảnh
                          );
                        }
                      }}
                    />
                  ) : (
                    <FaCheck
                      // size={18}
                      onClick={() => {
                        if (disabledButtons[user.id]) {
                          handleApprove(
                            user.id,
                            "Xác nhận mở khóa tài khoản" // hoặc tùy theo ngữ cảnh
                          );
                        }
                      }}
                    />
                  )}
                </span>
              </td>
            </tr>
          ))}
      </tbody>
    );
  };
  return (
    <div>
      <div>
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={() => setUserMode("ALL")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-blue-600",
                userMode === "ALL" && "font-bold"
              )
            )}
          >
            Tất cả
          </Button>
          <Button
            onClick={() => setUserMode("CUSTOMER")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-orange-600",
                userMode === "CUSTOMER" && "font-bold"
              )
            )}
          >
            Khách hàng
          </Button>
          <Button
            onClick={() => setUserMode("OWNER")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-purple-600",
                userMode === "OWNER" && "font-bold"
              )
            )}
          >
            Chủ sở hữu
          </Button>
          <Button
            onClick={() => setUserMode("AGENT")}
            className={twMerge(
              clsx(
                "whitespace-nowrap bg-transparent border-none text-green-600",
                userMode === "AGENT" && "font-bold"
              )
            )}
          >
            Môi giới
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <InputSelect
            register={register}
            id="sort"
            errors={errors}
            placeholder="Trạng thái"
            options={[
              { label: "Đang hoạt động", code: true },
              { label: "Bị khóa", code: false },
            ]}
            containerClassname="flex-row items-center gap-2"
            label="Lọc: "
            inputClassname="w-fit rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)} // value is string
          />
          <InputForm
            id="search-user"
            register={register}
            errors={errors}
            placeholder="Tìm kiếm tên người dùng, email, sdt..."
            containerClassname="flex-none w-80"
            inputClassname="rounded-md border border-gray-300"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
      </div>
      <div className="relative overflow-x-auto overflow-y-auto mt-6">
        <table className="min-w-full">
          {renderTableHead()}
          {renderTableBody()}
        </table>
      </div>
      <TablePagination
        component="div"
        count={filteredUsers.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} trên tổng số ${count}`
        }
      />
    </div>
  );
};

export default ManageAccounts;
