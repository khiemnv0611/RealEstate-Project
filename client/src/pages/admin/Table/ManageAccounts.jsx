import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Button, InputForm } from "~/components";
import TablePagination from "@mui/material/TablePagination";
import { apiGetUsers, apiUpdateUserStatus } from "~/apis/user";
import Swal from "sweetalert2";

const ManageAccounts = () => {
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
  const [selectAll, setSelectAll] = useState(false);
  const checkboxRef = useRef(null);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [users, setUsers] = useState([]);
  const [userMode, setUserMode] = useState("ALL");
  const [searchName, setSearchName] = useState(""); // Tìm kiếm tên
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      // setSelectedRows([...Array(totalRows).keys()]);
      // setDisabledButtons(Array(totalRows).fill(true));

      const start = page * rowsPerPage; // Vị trí bắt đầu
      const end = start + rowsPerPage; // Vị trí kết thúc
      const visibleUsers = filteredUsers.slice(start, end).map(user => user.id);
      setSelectedRows(visibleUsers); // Chọn các property trong trang hiện tại
      setDisabledButtons(Array(rowsPerPage).fill(true)); // Disable các button cho các hàng hiện tại
    } else {
      // setSelectedRows([]);
      // setDisabledButtons(Array(totalRows).fill(false));

      setSelectedRows([]); // Bỏ chọn tất cả
      setDisabledButtons(Array(rowsPerPage).fill(false)); // Bật lại tất cả button
    }
  };

  const handleCheckboxChange = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      let updatedSelectedRows;
  
      if (prevSelectedRows.includes(userId)) {
        // Nếu user đã được chọn, thì loại bỏ user đó khỏi danh sách
        updatedSelectedRows = prevSelectedRows.filter((id) => id !== userId);
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[userId] = false; // Bật lại button cho user này
          return updatedDisabledButtons;
        });
      } else {
        // Nếu user chưa được chọn, thì thêm vào danh sách
        updatedSelectedRows = [...prevSelectedRows, userId];
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[userId] = true; // Disable button cho user này
          return updatedDisabledButtons;
        });
      }
  
      // Kiểm tra nếu tất cả các user trong trang hiện tại đều được chọn
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      const visibleUsers = filteredUsers.slice(start, end).map(user => user.id);
  
      if (visibleUsers.every((id) => updatedSelectedRows.includes(id))) {
        setSelectAll(true);
      } else {
        setSelectAll(false);
      }
  
      return updatedSelectedRows;
    });
  };  

  const handleSpanClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  useEffect(() => {
    const filterByStatus = () => {
      const filtered = users.filter((user) => {
        const roles = user.userRoles.map(role => role.roleName.value.toLowerCase());

        // Kiểm tra điều kiện theo từng `userMode`
        if (userMode === "ALL") {
          return roles.includes("khách hàng") || roles.includes("chủ tài sản") || roles.includes("môi giới");
        }
        if (userMode === "CUSTOMER") {
          return roles.includes("khách hàng");
        }
        if (userMode === "OWNER") {
          return roles.includes("chủ tài sản");
        }
        if (userMode === "AGENT") {
          return roles.includes("môi giới");
        }
        return true;
      });
      setFilteredUsers(filtered);
    };

    filterByStatus();
  }, [userMode, users]);

  // LỌC DANH SÁCH THEO KEYWORDS
  useEffect(() => {
    const filtered = users.filter((user) => {
      const matchesName = user.name.toLowerCase().includes(searchName.toLowerCase());

      return matchesName;
    });

    setFilteredUsers(filtered);
  }, [searchName, users]);

  // GET DATA
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await apiGetUsers()
      if (response) setUsers(response.users)
    }
    
    fetchUsers()
  }, [])

  // DUYỆT 1 USER
  const handleApprove = async (id, message) => {
    Swal.fire({
      icon: "warning",
      title: "Xác nhận!",
      text: message,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiUpdateUserStatus(id)
        if (res) {
          // Cập nhật thành công
          Swal.fire('HAHA!', '', 'success')
          // Update UI here
        }
      } else if (result.isDenied) {
        // Cancel
        Swal.fire('HAHA?', '', 'info')
      }
    });
  }

  const renderTableHead = () => {
    return (
      <thead className="sticky top-0 bg-gray-200 z-20">
        <tr>
          <th className="whitespace-nowrap px-10 py-3">
            <RiCheckboxIndeterminateFill size={20} />
          </th>
          <th className="whitespace-nowrap px-10 py-3">STT</th>
          <th className="whitespace-nowrap px-10 py-3">Tên tài khoản</th>
          <th className="whitespace-nowrap px-10 py-3">Avatar</th>
          <th className="whitespace-nowrap px-10 py-3">Email</th>
          <th className="whitespace-nowrap px-10 py-3">Số điện thoại</th>
          <th className="whitespace-nowrap px-10 py-3">Vai trò</th>
          <th className="whitespace-nowrap px-10 py-3">Ngày tạo</th>
          <th className="whitespace-nowrap px-10 py-3">Available</th>
          <th className="whitespace-nowrap px-10 py-3"></th>
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
                  selectedRows.includes(user.id) && "bg-blue-200"
                )
              )}
            >
              <td className="relative p-6 text-center whitespace-nowrap border-b">
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
                {
                  user.userRoles
                    .map((role) => role.roleName.value)
                    .join(", ")
                }
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {new Date(user.createdAt).toLocaleString()}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {user.isAvailable ? "Hoạt động" : "Đã khóa"}
              </td>
              <td className="p-6 text-center whitespace-nowrap sticky right-0 z-10">
                <span
                  className={twMerge(
                    "p-2 border border-gray-400 flex items-center w-fit",
                    clsx({
                      "bg-red-400 cursor-pointer": disabledButtons[user.id],
                      " bg-gray-200 cursor-not-allowed":
                        !disabledButtons[user.id],
                    })
                  )}
                >
                  <MdDeleteOutline size={18}
                    onClick={() => {
                      if (disabledButtons[user.id]) {
                        handleApprove(user.id, (user.isAvailable ? "Xác nhận khóa tài khoảng" : "Xác nhận mở khóa tài khoản"))
                      }
                    }}
                    
                  />
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
          <div className="flex gap-4 items-center">
            <input
              type="checkbox"
              checked={selectAll}
              onChange={handleSelectAllChange}
              ref={checkboxRef}
              className="form-checkbox"
            />
            <span onClick={handleSpanClick} className="cursor-pointer">
              Chọn tất cả
            </span>
            {selectedRows.length >= 2 && (
              <span className="p-2 border border-gray-400 bg-white hover:bg-red-400 hover:underline cursor-pointer flex items-center">
                <MdDeleteOutline size={18} />
              </span>
            )}
          </div>
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
        count={users.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </div>
  );
};

export default ManageAccounts;
