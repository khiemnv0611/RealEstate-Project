import React, { useEffect, useState } from "react";
import { Button, InputForm, InputSelect, Title } from "~/components";
import { GrDocumentText } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import SelectLib from "~/components/inputs/SelectLib";
import { RiCheckboxIndeterminateFill } from "react-icons/ri";
import { FaCheck } from "react-icons/fa6";

const Dashboard = () => {
  // State để theo dõi các hàng được chọn
  const [selectedRows, setSelectedRows] = useState([]);
  // State để theo dõi trạng thái của checkbox "Chọn tất cả"
  const [selectAll, setSelectAll] = useState(false);

  // Hàm xử lý khi checkbox "Chọn tất cả" được thay đổi
  const handleSelectAllChange = (event) => {
    const isChecked = event.target.checked;
    setSelectAll(isChecked);
    if (isChecked) {
      // Chọn tất cả các hàng
      setSelectedRows([...Array(5).keys()]);
    } else {
      // Bỏ chọn tất cả các hàng
      setSelectedRows([]);
    }
  };

  // Hàm xử lý khi checkbox trong bảng được chọn hoặc bỏ chọn
  const handleCheckboxChange = (index) => {
    setSelectedRows((prevSelectedRows) => {
      // Kiểm tra xem chỉ số hàng hiện tại đã được chọn chưa
      if (prevSelectedRows.includes(index)) {
        // Nếu đã chọn, loại bỏ chỉ số này khỏi danh sách đã chọn
        return prevSelectedRows.filter((rowIndex) => rowIndex !== index);
      } else {
        // Nếu chưa chọn, thêm chỉ số này vào danh sách đã chọn
        return [...prevSelectedRows, index];
      }
    });
  };

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
    // Lọc các dự án theo giá trị của mode
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
      <div className="bg-gray-200 w-full min-h-screen px-6 py-8 gap-4">
        <Title className="ml-2 -mb-4" title="Bảng Điều Khiển" />
        <div className="flex flex-wrap justify-between items-center">
          <div className="px-6 py-5 flex w-[450px] gap-4 sm:w-1/2 xl:w-1/3">
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
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
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
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
            <div className="bg-white w-full rounded-md flex px-5 py-6 gap-4">
              <div className="rounded-full bg-pink-400 p-4">
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
        <div className="ml-6 mr-6 gap-6">
          <div className="flex items-center justify-center gap-4">
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
                className="form-checkbox"
              />
              <span>Chọn tất cả</span>
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
          <div className="relative overflow-x-auto overflow-y-auto my-6">
            <table className="min-w-full border-collapse">
              <thead className="border-b-2 border-black">
                <tr>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    <RiCheckboxIndeterminateFill size={20} />
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Thời gian
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Trạng thái
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Người đăng
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Loại giao dịch
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Loại hình dự án
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Tiêu đề
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">Mô tả</th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Địa chỉ
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Thành phố
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Hình tổng quát
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Toàn bộ hình ảnh
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Số phòng ngủ
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Số phòng tắm
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Diện tích
                  </th>
                  <th className="whitespace-nowrap px-10 py-2 border">
                    Năm xây dựng
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {[...Array(5)].map((_, index) => (
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
                        <span className="px-2 border border-gray-400 bg-green-400 hover:underline cursor-pointer flex items-center">
                          Duyệt
                        </span>
                        <span className="px-2 py-1 border border-gray-400 bg-red-400 hover:underline cursor-pointer flex items-center">
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
      </div>
    </div>
  );
};

export default Dashboard;
