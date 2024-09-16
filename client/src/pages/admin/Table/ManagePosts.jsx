import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Button, InputForm, InputSelect } from "~/components";
import SelectLib from "~/components/inputs/SelectLib";
import TablePagination from "@mui/material/TablePagination";

const ManagePosts = () => {
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

  const [postMode, setPostMode] = useState("ALL");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  useEffect(() => {
    const filterByStatus = () => {
      const filtered = properties.filter((property) => {
        if (postMode === "ALL") return property.status === "Tất cả";
        if (postMode === "PENDING") return property.status === "Chờ duyệt";
        if (postMode === "APPROVED") return property.status === "Đã duyệt";
        if (postMode === "CANCELLED") return property.status === "Bị hủy";
        return true;
      });
      setFilteredProperties(filtered);
    };

    filterByStatus();
  }, [postMode, properties]);

  const postsData = [...Array(totalRows)].map((_, index) => ({
    id: "property.id",
    time: "2023-09-12",
    status: "Chờ duyệt",
    user: { name: "Nguyễn Văn A", role: "Admin", contact: "0909000000" },
    listingType: "Bán",
    projectType: "Chung cư",
    title: "Căn hộ cao cấp",
    description:
      "Mô tả bài đăng qiuwe gho qi uw eb hqưveq ựihb joklf nuiơ ehro uqbư ẹqưb equi wgeqơi uebq jhb ihgvq ơuiu",
    address: "123 Nguyễn Thị Minh Khai, Quận 1",
    city: "Hồ Chí Minh",
    featuredImage: "img.jpg",
    images: ["img1.jpg", "img2.jpg"],
    rooms: { bedRooms: 3, bathRooms: 2 },
    size: 120,
    yearBuilt: 2015,
  }));

  const renderTableHead = () => {
    return (
      <thead className="sticky top-0 bg-gray-200 z-20">
        <tr>
          <th className="whitespace-nowrap px-10 py-3">
            <RiCheckboxIndeterminateFill size={20} />
          </th>
          <th className="whitespace-nowrap px-10 py-3">STT</th>
          <th className="whitespace-nowrap px-10 py-3">Thời gian</th>
          <th className="whitespace-nowrap px-10 py-3">Trạng thái</th>
          <th className="whitespace-nowrap px-10 py-3">Người đăng</th>
          <th className="whitespace-nowrap px-10 py-3">Loại giao dịch</th>
          <th className="whitespace-nowrap px-10 py-3">Loại hình dự án</th>
          <th className="whitespace-nowrap px-10 py-3">Tiêu đề</th>
          <th className="whitespace-nowrap px-10 py-3">Mô tả</th>
          <th className="whitespace-nowrap px-10 py-3">Địa chỉ</th>
          <th className="whitespace-nowrap px-10 py-3">Thành phố</th>
          <th className="whitespace-nowrap px-10 py-3">Hình tổng quát</th>
          <th className="whitespace-nowrap px-10 py-3">Toàn bộ hình ảnh</th>
          <th className="whitespace-nowrap px-10 py-3">Số phòng ngủ</th>
          <th className="whitespace-nowrap px-10 py-3">Số phòng tắm</th>
          <th className="whitespace-nowrap px-10 py-3">Diện tích</th>
          <th className="whitespace-nowrap px-10 py-3">Năm xây dựng</th>
          <th></th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="bg-white">
        {postsData
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((property, index) => (
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
                {property.id}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.time}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                <div className="w-fit px-2 mx-auto rounded-3xl bg-orange-500">
                  {property.status}
                </div>
              </td>
              <td className="relative p-6 whitespace-nowrap border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={property.featuredImage}
                    alt=""
                    className="w-14 h-14 object-cover bg-gray-500 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{property.user.name}</span>
                    <span>{property.user.role}</span>
                    <span>{property.user.contact}</span>
                  </div>
                </div>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.listingType}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.projectType}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.title}
              </td>
              <td className="relative p-6 text-center border-b min-w-80 break-words overflow-hidden">
                <div className="line-clamp-2">{property.description}</div>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.address}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.city}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.featuredImage}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.images.join(", ")}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.rooms.bedRooms}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.rooms.bathRooms}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.size} m<sup>2</sup>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.yearBuilt}
              </td>
              <td className="p-6 text-center whitespace-nowrap sticky right-0 z-10">
                <div className="flex gap-1">
                  <span
                    className={twMerge(
                      "px-2 py-1 border border-gray-400 flex items-center",
                      clsx({
                        "bg-green-400 hover:underline cursor-pointer":
                          disabledButtons[index],
                        " bg-gray-200 cursor-not-allowed":
                          !disabledButtons[index],
                      })
                    )}
                  >
                    Duyệt
                  </span>
                  <span
                    className={twMerge(
                      "px-2 py-1 border border-gray-400 flex items-center",
                      clsx({
                        "bg-red-400 hover:underline cursor-pointer":
                          disabledButtons[index],
                        " bg-gray-200 cursor-not-allowed":
                          !disabledButtons[index],
                      })
                    )}
                  >
                    Từ chối
                  </span>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    );
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={() => setPostMode("ALL")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-purple-600",
              postMode === "ALL" && "font-bold"
            )
          )}
        >
          Tất cả
        </Button>
        <Button
          onClick={() => setPostMode("PENDING")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-main-700",
              postMode === "PENDING" && "font-bold"
            )
          )}
        >
          Chờ duyệt
        </Button>
        <Button
          onClick={() => setPostMode("APPROVED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-green-600",
              postMode === "APPROVED" && "font-bold"
            )
          )}
        >
          Đã duyệt
        </Button>
        <Button
          onClick={() => setPostMode("CANCELLED")}
          className={twMerge(
            clsx(
              "whitespace-nowrap bg-transparent border-none text-red-600",
              postMode === "CANCELLED" && "font-bold"
            )
          )}
        >
          Bị hủy
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
            <div className="flex gap-1">
              <span className="px-2 border border-gray-400 bg-green-400 hover:underline cursor-pointer flex items-center">
                Duyệt
              </span>
              <span className="px-2 py-1 border border-gray-400 bg-red-400 hover:underline cursor-pointer flex items-center">
                Từ chối
              </span>
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <InputForm
            id="search-postedBy"
            register={register}
            errors={errors}
            placeholder="Tìm kiếm tên người đăng"
            containerClassname="flex-none w-fit"
            inputClassname="rounded-md border border-gray-300"
          />
          <SelectLib
            id="sort-propertyType"
            register={register}
            errors={errors}
            inputClassname="rounded-md border border-gray-300"
            placeholder="Loại hình dự án"
          />
          <InputSelect
            register={register}
            id="sort-time"
            errors={errors}
            placeholder="Thời gian"
            options={[
              { label: "Mới nhất", code: "-createdAt" },
              { label: "Cũ hơn", code: "createdAt" },
            ]}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
          />
          <InputSelect
            register={register}
            id="sort-listingType"
            errors={errors}
            placeholder="Loại giao dịch"
            options={[
              { label: "Bán", code: "" },
              { label: "Cho thuê", code: "" },
            ]}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
          />
          <InputSelect
            register={register}
            id="sort-city"
            errors={errors}
            placeholder="Thành phố"
            // options={[
            //   { label: "Bán", code: "" },
            //   { label: "Cho thuê", code: "" },
            // ]}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
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
        count={postsData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Số hàng mỗi trang:"
      />
    </div>
  );
};

export default ManagePosts;
