import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import { Button, InputForm, InputSelect } from "~/components";
import SelectLib from "~/components/inputs/SelectLib";
import TablePagination from "@mui/material/TablePagination";
import {
  apiGetPropertiesWithoutPagination,
  apiUpdatePropertiesStatus,
  apiUpdatePropertyStatus,
} from "~/apis/properties";
import { usePropertiesStore } from "~/store/usePropertiesStore";
import { cityDistricts } from "~/utils/constants";
import Swal from "sweetalert2";
import { ImageList, ImageListItem } from "@mui/material";

const ManagePosts = () => {
  const [page, setPage] = useState(0); // Quản lý trang hiện tại
  const [rowsPerPage, setRowsPerPage] = useState(5); // Số lượng hàng mỗi trang
  const [searchPostedBy, setSearchPostedBy] = useState(""); // Tìm kiếm tên người đăng
  const [selectedPropertyType, setSelectedPropertyType] = useState(null); // Loại hình dự án
  const [selectedListingType, setSelectedListingType] = useState(""); // Loại giao dịch
  const [selectedCity, setSelectedCity] = useState(""); // Thành phố
  const [sortOrder, setSortOrder] = useState("-createdAt");

  const handlePropertyTypeChange = (selectedOption) => {
    setSelectedPropertyType(selectedOption);
  };

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
    formState: { errors },
    register,
  } = useForm();

  const totalRows = 10;
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const checkboxRef = useRef(null);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [cities, setCities] = useState(Object.keys(cityDistricts));

  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);

    if (isChecked) {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      const visibleProperties = filteredProperties
        .slice(start, end)
        .map((property) => property.id);

      setSelectedRows(visibleProperties);

      // Disable các button cho từng property dựa trên ID
      const updatedDisabledButtons = {};
      visibleProperties.forEach((id) => {
        updatedDisabledButtons[id] = true; // Disable button cho property này
      });
      setDisabledButtons(updatedDisabledButtons);
    } else {
      setSelectedRows([]);

      // Enable lại tất cả các button
      const updatedDisabledButtons = {};
      filteredProperties.forEach((property) => {
        updatedDisabledButtons[property.id] = false; // Enable button cho từng property
      });
      setDisabledButtons(updatedDisabledButtons);
    }
  };

  const handleCheckboxChange = (pid) => {
    setSelectedRows((prevSelectedRows) => {
      let updatedSelectedRows;

      if (prevSelectedRows.includes(pid)) {
        updatedSelectedRows = prevSelectedRows.filter((id) => id !== pid);

        // Enable button cho property này
        setDisabledButtons((prevDisabledButtons) => ({
          ...prevDisabledButtons,
          [pid]: false,
        }));
      } else {
        updatedSelectedRows = [...prevSelectedRows, pid];

        // Disable button cho property này
        setDisabledButtons((prevDisabledButtons) => ({
          ...prevDisabledButtons,
          [pid]: true,
        }));
      }

      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      const visibleProperties = filteredProperties
        .slice(start, end)
        .map((property) => property.id);

      if (visibleProperties.every((id) => updatedSelectedRows.includes(id))) {
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

  const [postMode, setPostMode] = useState("ALL");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const { propertyTypes } = usePropertiesStore();

  // LỌC THEO STATUS
  useEffect(() => {
    const filterByStatus = () => {
      const filtered = properties.filter((property) => {
        if (postMode === "ALL")
          return (
            property.status === "Chờ duyệt" ||
            property.status === "Đã duyệt" ||
            property.status === "Bị hủy"
          );
        if (postMode === "PENDING") return property.status === "Chờ duyệt";
        if (postMode === "APPROVED") return property.status === "Đã duyệt";
        if (postMode === "CANCELLED") return property.status === "Bị hủy";
        return true;
      });
      setFilteredProperties(filtered);
    };

    filterByStatus();
  }, [postMode, properties]);

  // LỌC DANH SÁCH THEO KEYWORDS
  useEffect(() => {
    const filtered = properties.filter((property) => {
      const matchesPostedBy = property.rPostedBy.name
        .toLowerCase()
        .includes(searchPostedBy.toLowerCase());
      const matchesPropertyType = selectedPropertyType
        ? property.rPropertyType.name === selectedPropertyType.name
        : true;
      const matchesListingType = selectedListingType
        ? property.listingType === selectedListingType
        : true;
      const matchesCity = selectedCity
        ? property.city.toLowerCase() === selectedCity.toLowerCase()
        : true;

      return (
        matchesPostedBy &&
        matchesPropertyType &&
        matchesListingType &&
        matchesCity
      );
    });

    const sorted = filtered.sort((a, b) => {
      if (sortOrder === "-createdAt") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Mới nhất trước
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // Cũ hơn trước
      }
    });

    setFilteredProperties(filtered);
  }, [
    searchPostedBy,
    selectedPropertyType,
    selectedListingType,
    selectedCity,
    sortOrder,
    properties,
  ]);

  // LẤY DỮ LIỆU BÀI ĐĂNG
  useEffect(() => {
    const fetchProperties = async () => {
      const res = await apiGetPropertiesWithoutPagination();
      if (res) setProperties(res.properties.rows);
    };
    fetchProperties();
  }, []);

  // DUYỆT 1 BÀI ĐĂNG
  const handleApprove = async (id, status, message) => {
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
        const res = await apiUpdatePropertyStatus(id, { status });
        if (res) {
          Swal.fire("Thành công!", "", "success").then(() => {
            // Tải lại trang sau khi thông báo thành công
            window.location.reload();
          });
          // Cập nhật danh sách thuộc tính nếu cần
          setFilteredProperties(
            filtered.map((property) =>
              property.id === id ? { ...property, status } : property
            )
          );
        }
      }
    });
  };

  // DUYỆT NHIỀU BÀI ĐĂNG
  const handleApproveProperties = async (status, message) => {
    console.log(selectedRows);

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
        const res = await apiUpdatePropertiesStatus({
          status,
          propertyIds: selectedRows,
        });
        if (res) {
          Swal.fire("Thành công!", "", "success").then(() => {
            // Tải lại trang sau khi thông báo thành công
            window.location.reload();
          });
          // Cập nhật danh sách thuộc tính nếu cần
          setFilteredProperties(
            filtered.map((property) =>
              property.id === id ? { ...property, status } : property
            )
          );
        }
      }
    });
  };

  const renderTableHead = () => {
    return (
      <thead className="sticky top-0 bg-gray-200 z-20">
        <tr>
          <th className="sticky left-0 z-10 bg-gray-200 whitespace-nowrap px-10 py-3">
            <RiCheckboxIndeterminateFill size={20} />
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">STT</th>
          <th className="relative whitespace-nowrap px-10 py-3">Thời gian</th>
          <th className="relative whitespace-nowrap px-10 py-3">Trạng thái</th>
          <th className="relative whitespace-nowrap px-10 py-3">Người đăng</th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Loại giao dịch
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Loại hình dự án
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">Tiêu đề</th>
          <th className="relative whitespace-nowrap px-10 py-3">Mô tả</th>
          <th className="relative whitespace-nowrap px-10 py-3">Địa chỉ</th>
          <th className="relative whitespace-nowrap px-10 py-3">Thành phố</th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Hình tổng quát
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Toàn bộ hình ảnh
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Số phòng ngủ
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Số phòng tắm
          </th>
          <th className="relative whitespace-nowrap px-10 py-3">Diện tích</th>
          <th className="relative whitespace-nowrap px-10 py-3">
            Năm xây dựng
          </th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody className="bg-white">
        {filteredProperties
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((property, index) => (
            <tr
              key={property.id}
              className={twMerge(
                clsx(
                  "border-b border-gray-200",
                  selectedRows.includes(property.id) && "bg-blue-200"
                )
              )}
            >
              <td
                className={twMerge(
                  clsx(
                    "sticky left-0 z-10 p-6 text-center whitespace-nowrap border-b",
                    selectedRows.includes(property.id)
                      ? "bg-blue-200"
                      : "bg-white"
                  )
                )}
              >
                <input
                  type="checkbox"
                  checked={selectedRows.includes(property.id)}
                  onChange={() => handleCheckboxChange(property.id)}
                />
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.id}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {new Date(property.createdAt).toLocaleString()}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                <div
                  className={twMerge(
                    "w-fit px-2 mx-auto rounded-3xl",
                    clsx({
                      "bg-blue-500": property.status === "Chờ duyệt",
                      "bg-green-500": property.status === "Đã duyệt",
                      "bg-red-500": property.status === "Bị hủy",
                      "bg-orange-500": ![
                        "Chờ duyệt",
                        "Đã duyệt",
                        "Bị hủy",
                      ].includes(property.status), // Mặc định nếu không khớp
                    })
                  )}
                >
                  {property.status}
                </div>
              </td>
              <td className="relative p-6 whitespace-nowrap border-b">
                <div className="flex items-center gap-3">
                  <img
                    src={property.rPostedBy.avatar}
                    alt=""
                    className="w-14 h-14 object-cover bg-gray-500 rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold">{property.rPostedBy.name}</span>
                    <span>
                      {property.rPostedBy.userRoles
                        .map((role) => role.roleName.value)
                        .join(", ")}
                    </span>
                    <span>{property.rPostedBy.phone}</span>
                    <span>{property.rPostedBy.email}</span>
                  </div>
                </div>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.listingType}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.rPropertyType.name}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.name}
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
                <img
                  src={property.featuredImage}
                  alt={property.name}
                  className="w-64 h-24 object-cover bg-gray-500 rounded"
                />
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {/* {property.images.join(", ")} */}
                <ImageList
                  sx={{ width: 425, height: 128 }}
                  variant="masonry"
                  cols={3}
                  gap={8}
                >
                  {property.images.map((item) => (
                    <ImageListItem key={item}>
                      <img
                        srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        src={`${item}?w=248&fit=crop&auto=format`}
                        alt={item}
                        loading="lazy"
                      />
                    </ImageListItem>
                  ))}
                </ImageList>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.bedRoom}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.bathRoom}
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.propertySize} m<sup>2</sup>
              </td>
              <td className="relative p-6 text-center whitespace-nowrap border-b">
                {property.yearBuilt}
              </td>
              {property.status === "Chờ duyệt" && (
                <td
                  className={twMerge(
                    "p-6 text-center whitespace-nowrap sticky right-0 z-10",
                    selectedRows.includes(property.id)
                      ? "bg-blue-200"
                      : "bg-white" // Đồng bộ màu với tr khi được chọn
                  )}
                >
                  <div className="flex gap-1">
                    <span
                      className={twMerge(
                        "px-2 py-1 border border-gray-400 flex items-center",
                        clsx({
                          "bg-green-400 hover:underline cursor-pointer":
                            disabledButtons[property.id],
                          "bg-gray-200 cursor-not-allowed":
                            !disabledButtons[property.id],
                        })
                      )}
                      onClick={() => {
                        if (disabledButtons[property.id]) {
                          handleApprove(
                            property.id,
                            "Đã duyệt",
                            "Bạn có muốn duyệt bài đăng này"
                          );
                        }
                      }}
                    >
                      Duyệt
                    </span>
                    <span
                      className={twMerge(
                        "px-2 py-1 border border-gray-400 flex items-center",
                        clsx({
                          "bg-red-400 hover:underline cursor-pointer":
                            disabledButtons[property.id],
                          "bg-gray-200 cursor-not-allowed":
                            !disabledButtons[property.id],
                        })
                      )}
                      onClick={() => {
                        if (disabledButtons[property.id]) {
                          handleApprove(
                            property.id,
                            "Bị hủy",
                            "Bạn có muốn từ chối bài đăng này"
                          );
                        }
                      }}
                    >
                      Từ chối
                    </span>
                  </div>
                </td>
              )}
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
        <div>
          {postMode === "PENDING" && (
            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAllChange}
                ref={checkboxRef}
                className="form-checkbox"
              />
              <span onClick={handleSpanClick} className="cursor-pointer">
                Chọn tất cả trong trang hiện tại
              </span>
              {selectedRows.length >= 2 && (
                <div className="flex gap-1">
                  <span
                    className="px-2 border border-gray-400 bg-green-400 hover:underline cursor-pointer flex items-center"
                    onClick={() =>
                      handleApproveProperties(
                        "Đã duyệt",
                        "Bạn có muốn duyệt các bài đăng này"
                      )
                    }
                  >
                    Duyệt
                  </span>
                  <span
                    className="px-2 py-1 border border-gray-400 bg-red-400 hover:underline cursor-pointer flex items-center"
                    onClick={() =>
                      handleApproveProperties(
                        "Bị hủy",
                        "Bạn có muốn từ chối các bài đăng này"
                      )
                    }
                  >
                    Từ chối
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <InputForm
            id="search-postedBy"
            // register={register}
            errors={errors}
            placeholder="Tìm kiếm tên người đăng"
            containerClassname="flex-none w-fit"
            inputClassname="rounded-md border border-gray-300"
            value={searchPostedBy}
            onChange={(e) => setSearchPostedBy(e.target.value)}
          />
          {/* <SelectLib
            id="sort-propertyType"
            register={register}
            errors={errors}
            inputClassname="rounded-md border border-gray-300"
            options={propertyTypes?.map((el) => ({ ...el, label: el.name }))}
            placeholder="Loại hình dự án"
            onChange={handlePropertyTypeChange}
          /> */}
          <InputSelect
            id="sort-time"
            register={register}
            errors={errors}
            placeholder="Thời gian"
            options={[
              { label: "Mới nhất", code: "-createdAt" },
              { label: "Cũ hơn", code: "createdAt" },
            ]}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          />
          <InputSelect
            id="sort-listingType"
            register={register}
            errors={errors}
            placeholder="Loại giao dịch"
            options={[
              { label: "Bán", code: "Bán" },
              { label: "Cho thuê", code: "Cho thuê" },
            ]}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
            value={selectedListingType}
            onChange={(e) => setSelectedListingType(e.target.value)}
          />
          <InputSelect
            id="sort-city"
            register={register}
            errors={errors}
            placeholder="Thành phố"
            options={cities.map((city, index) => ({ label: city, code: city }))}
            containerClassname="flex-none w-fit"
            inputClassname="w-fit rounded-md"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
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
        count={filteredProperties.length} // Tổng số phần tử
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

export default ManagePosts;
