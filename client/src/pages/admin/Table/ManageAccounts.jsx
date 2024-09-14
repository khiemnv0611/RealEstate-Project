import clsx from "clsx";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { MdDeleteOutline } from "react-icons/md";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Button, InputForm } from "~/components";

const ManageAccounts = () => {
  const {
    register,
    formState: { errors },
    watch,
    containerClassname,
  } = useForm();

  const totalRows = 10;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const checkboxRef = useRef(null);
  const [disabledButtons, setDisabledButtons] = useState([]);

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedRows([...Array(totalRows).keys()]);
      setDisabledButtons(Array(totalRows).fill(true));
    } else {
      setSelectedRows([]);
      setDisabledButtons(Array(totalRows).fill(false));
    }
  };

  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) => {
      let updatedSelectedRows;
      if (prevSelectedRows.includes(index)) {
        updatedSelectedRows = prevSelectedRows.filter(
          (rowIndex) => rowIndex !== index
        );
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[index] = false;
          return updatedDisabledButtons;
        });
      } else {
        updatedSelectedRows = [...prevSelectedRows, index];
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[index] = true;
          return updatedDisabledButtons;
        });
      }

      if (updatedSelectedRows.length < totalRows) {
        setSelectAll(false);
      } else {
        setSelectAll(true);
      }

      return updatedSelectedRows;
    });
  };

  const handleSpanClick = () => {
    if (checkboxRef.current) {
      checkboxRef.current.click();
    }
  };

  const [userMode, setUserMode] = useState("CUSTOMER");
  // const [properties, setProperties] = useState([]);
  // const [filteredProperties, setFilteredProperties] = useState([]);

  const accountsData = [...Array(totalRows)].map((_, index) => ({
    id: "user.id",
    username: "user" + (index + 1),
    email: "user.email",
    phone: "user.phone",
    role: "Member",
    createdAt: "2023-09-12",
  }));

  const renderTableHead = () => {
    return (
      <thead className="sticky top-0 bg-gray-200 z-20">
        <tr>
          <th className="whitespace-nowrap px-10 py-3">
            <RiCheckboxIndeterminateFill size={20} />
          </th>
          <th className="whitespace-nowrap px-10 py-3">STT</th>
          <th className="whitespace-nowrap px-10 py-3">Tên tài khoản</th>
          <th className="whitespace-nowrap px-10 py-3">Email</th>
          <th className="whitespace-nowrap px-10 py-3">Số điện thoại</th>
          <th className="whitespace-nowrap px-10 py-3">Vai trò</th>
          <th className="whitespace-nowrap px-10 py-3">Ngày tạo</th>
          <th className="whitespace-nowrap px-10 py-3"></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="bg-white">
        {accountsData.map((account, index) => (
          <tr
            key={index}
            className={twMerge(
              clsx(
                "border-b border-gray-200",
                selectedRows.includes(index) && "bg-blue-200"
              )
            )}
          >
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              <input
                type="checkbox"
                checked={selectedRows.includes(index)}
                onChange={() => handleCheckboxChange(index)}
              />
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.id}
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.username}
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.email}
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.phone}
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.role}
            </td>
            <td className="relative p-6 text-center whitespace-nowrap border-b">
              {account.createdAt}
            </td>
            <td className="p-6 text-center whitespace-nowrap sticky right-0 z-10">
              <span
                className={twMerge(
                  "p-2 border border-gray-400 flex items-center w-fit",
                  clsx({
                    "bg-red-400 cursor-pointer": disabledButtons[index],
                    " bg-gray-200 cursor-not-allowed": !disabledButtons[index],
                  })
                )}
              >
                <MdDeleteOutline size={18} />
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
          />
        </div>
      </div>
      <div className="relative overflow-x-auto overflow-y-auto mt-6 max-h-[620px]">
        <table className="min-w-full">
          {renderTableHead()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default ManageAccounts;
