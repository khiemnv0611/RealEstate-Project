import React, { useEffect, useRef, useState } from "react";
import { Button, InputForm, InputSelect, Title } from "~/components";
import { GrDocumentText } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import SelectLib from "~/components/inputs/SelectLib";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";

const Dashboard = () => {
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
        // Nếu hàng đã được chọn, bỏ chọn hàng đó và bật lại button
        updatedSelectedRows = prevSelectedRows.filter(
          (rowIndex) => rowIndex !== index
        );
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[index] = false; // Bật lại button
          return updatedDisabledButtons;
        });
      } else {
        // Nếu hàng chưa được chọn, chọn hàng và vô hiệu hóa button
        updatedSelectedRows = [...prevSelectedRows, index];
        setDisabledButtons((prevDisabledButtons) => {
          const updatedDisabledButtons = [...prevDisabledButtons];
          updatedDisabledButtons[index] = true; // Vô hiệu hóa button
          return updatedDisabledButtons;
        });
      }

      // Nếu chưa chọn tất cả checkbox, bỏ chọn checkbox "Chọn tất cả"
      if (updatedSelectedRows.length < totalRows) {
        setSelectAll(false);
      } else {
        // Nếu đã chọn tất cả checkbox, tự động check lại "Chọn tất cả"
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

  const [activeTab, setActiveTab] = useState("POSTS");
  const [mode, setMode] = useState("ALL");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);

  const {
    register,
    formState: { errors },
    watch,
    containerClassname,
  } = useForm();

  useEffect(() => {
    const filterByStatus = () => {
      const filtered = properties.filter((property) => {
        if (mode === "ALL") return property.status === "Tất cả";
        if (mode === "PENDING") return property.status === "Chờ duyệt";
        if (mode === "APPROVED") return property.status === "Đã duyệt";
        if (mode === "CANCELLED") return property.status === "Bị hủy";
        return true;
      });
      setFilteredProperties(filtered);
    };

    filterByStatus();
  }, [mode, properties]);

  return (
    <div>
      <div className="bg-gray-200 w-full min-h-screen px-6 gap-4">
        <Title className="ml-2" title="Bảng Điều Khiển" />
        <div className="flex flex-wrap justify-between items-center">
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-purple-400": activeTab === "POSTS", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("POSTS")}
            >
              <div className="rounded-full bg-purple-400 p-4">
                <GrDocumentText size={30} />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">Post.Count</h4>
                <span className="text-gray-500">Bài đăng</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-blue-400": activeTab === "ACCOUNTS", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("ACCOUNTS")}
            >
              <div className="rounded-full bg-blue-400 p-4">
                <FaUsers size={30} />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">User.Count</h4>
                <span className="text-gray-500">Tài khoản</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div
              className={twMerge(
                "bg-white w-full rounded-md flex px-5 py-6 gap-4 cursor-pointer",
                clsx({
                  "ring-4 ring-yellow-400": activeTab === "ROLES", // Đổi màu viền khi được chọn
                })
              )}
              onClick={() => setActiveTab("ROLES")}
            >
              <div className="rounded-full bg-yellow-400 p-4">
                <img
                  src="/user-role.svg"
                  alt=""
                  className="w-[30px] h-[30px] object-contain"
                />
              </div>
              <div className="flex flex-col justify-between">
                <h4 className="font-semibold text-2xl">Role.Count</h4>
                <span className="text-gray-500">Vai trò</span>
              </div>
            </div>
          </div>
        </div>
        {activeTab === "POSTS" && (
          <div className="ml-6 mr-6 gap-6">
            <div className="flex items-center justify-center gap-4 mb-5">
              <Button
                onClick={() => setMode("ALL")}
                className={twMerge(
                  clsx(
                    "whitespace-nowrap bg-transparent border-none text-purple-600",
                    mode === "ALL" && "font-bold"
                  )
                )}
              >
                Tất cả
              </Button>
              <Button
                onClick={() => setMode("PENDING")}
                className={twMerge(
                  clsx(
                    "whitespace-nowrap bg-transparent border-none text-main-700",
                    mode === "PENDING" && "font-bold"
                  )
                )}
              >
                Chờ duyệt
              </Button>
              <Button
                onClick={() => setMode("APPROVED")}
                className={twMerge(
                  clsx(
                    "whitespace-nowrap bg-transparent border-none text-green-600",
                    mode === "APPROVED" && "font-bold"
                  )
                )}
              >
                Đã duyệt
              </Button>
              <Button
                onClick={() => setMode("CANCELLED")}
                className={twMerge(
                  clsx(
                    "whitespace-nowrap bg-transparent border-none text-red-600",
                    mode === "CANCELLED" && "font-bold"
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
                {selectAll && (
                  <div className="flex gap-1">
                    <span className="px-2 border border-gray-400 bg-green-400 hover:underline cursor-pointer flex items-center">
                      Duyệt tất cả
                    </span>
                    <span className="px-2 py-1 border border-gray-400 bg-red-400 hover:underline cursor-pointer flex items-center">
                      Từ chối tất cả
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
            <div className="relative overflow-x-auto overflow-y-auto my-6 max-h-[600px]">
              <table className="min-w-full">
                <thead className="sticky top-0 bg-gray-200 z-20">
                  <tr>
                    <th className="whitespace-nowrap px-10 py-3">
                      <RiCheckboxIndeterminateFill size={20} />
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">STT</th>
                    <th className="whitespace-nowrap px-10 py-3">Thời gian</th>
                    <th className="whitespace-nowrap px-10 py-3">Trạng thái</th>
                    <th className="whitespace-nowrap px-10 py-3">Người đăng</th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Loại giao dịch
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Loại hình dự án
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">Tiêu đề</th>
                    <th className="whitespace-nowrap px-10 py-3">Mô tả</th>
                    <th className="whitespace-nowrap px-10 py-3">Địa chỉ</th>
                    <th className="whitespace-nowrap px-10 py-3">Thành phố</th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Hình tổng quát
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Toàn bộ hình ảnh
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Số phòng ngủ
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Số phòng tắm
                    </th>
                    <th className="whitespace-nowrap px-10 py-3">Diện tích</th>
                    <th className="whitespace-nowrap px-10 py-3">
                      Năm xây dựng
                    </th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {[...Array(totalRows)].map((_, index) => (
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
                        property.id
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        time
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        <div className="w-fit px-2 mx-auto rounded-3xl bg-orange-500">
                          status
                        </div>
                      </td>
                      <td className="relative p-6 whitespace-nowrap border-b">
                        <div className="flex items-center gap-3">
                          <img
                            src=""
                            alt=""
                            className="w-14 h-14 object-cover bg-gray-500 rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="font-bold">Tên người đăng</span>
                            <span>ROL</span>
                            <span>Số điện thoại/Email</span>
                          </div>
                        </div>
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        Bán/Cho thuê
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        Loại hình dự án
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        Property.name
                      </td>
                      <td className="relative p-6 text-center border-b max-w-xs break-words overflow-hidden">
                        <div className="line-clamp-2">
                          qưuoehqưebnvdịhpbnfndsvbbưeiugoqiwneqebqưhjvqưiebiqưeqưyeigquưegbưhdvqưkjdb
                        </div>
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        123456 Nguyễn Thi Minh Khai, Phường Đa Kao, Quận 1
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        Thành phố Hồ Chí Minh
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        featuredImage
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        ArrayImage
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        number phòng
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        number phòng
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        number m<span className="align-super text-xs">2</span>
                      </td>
                      <td className="relative p-6 text-center whitespace-nowrap border-b">
                        Data 8
                      </td>
                      <td className="p-6 text-center whitespace-nowrap sticky right-0 z-10">
                        <div className="flex gap-1">
                          <span
                            className={twMerge(
                              "px-2 py-1 border border-gray-400 flex items-center",
                              clsx({
                                "bg-green-400 hover:underline cursor-pointer":
                                  disabledButtons[index],
                                " bg-gray-400 cursor-not-allowed":
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
                                " bg-gray-400 cursor-not-allowed":
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
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
