import React, { useEffect, useState } from "react";
import { Button, InputForm, InputSelect, Title } from "~/components";
import { GrDocumentText } from "react-icons/gr";
import { FaUsers } from "react-icons/fa6";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import SelectLib from "~/components/inputs/SelectLib";

const Dashboard = () => {
  const [selectedRow, setSelectedRow] = useState(null);

  // Function to handle row click
  const handleRowClick = (index) => {
    setSelectedRow(index); // Save the index of the selected row
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
            <div className="flex gap-4 items-center">
              <Button>Duyệt</Button>
              <Button className="bg-red-500">Hủy</Button>
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-auto my-6">
            <table className="min-w-full border-collapse">
              <thead className="border border-b-4">
                <tr>
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
                </tr>
              </thead>
              <tbody className="bg-white">
                {[...Array(5)].map((_, index) => (
                  <tr
                    key={index}
                    onClick={() => handleRowClick(index)}
                    className={twMerge(
                      clsx("cursor-pointer", {
                        "bg-blue-300": selectedRow === index,
                        "bg-white": selectedRow !== index,
                      })
                    )}
                  >
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      time
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      <div className="w-fit px-2 mx-auto rounded-3xl bg-orange-500">
                        status
                      </div>
                    </td>
                    <td className="px-6 py-6 whitespace-nowrap border">
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
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      Bán/Cho thuê
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      Loại hình dự án
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      Property.name
                    </td>
                    <td className="px-6 py-6 text-center border max-w-xs break-words overflow-hidden">
                      <div className="line-clamp-2">
                        qưuoehqưebnvdịhpbnfndsvbbưeiugoqiwneqebqưhjvqưiebiqưeqưyeigquưegbưhdvqưkjdb
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      123456 Nguyễn Thi Minh Khai, Phường Đa Kao, Quận 1
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      Thành phố Hồ Chí Minh
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      featuredImage
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      ArrayImage
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      number phòng
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      number phòng
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      number m<span className="align-super text-xs">2</span>
                    </td>
                    <td className="px-6 py-6 text-center whitespace-nowrap border">
                      Data 8
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
