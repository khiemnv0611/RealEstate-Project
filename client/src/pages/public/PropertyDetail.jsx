import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetDetailProperty } from "~/apis/properties";
import { BoxInfo, BreadCrumb, Images, Map } from "~/components";
import { GrLocation } from "react-icons/gr";
import DOMPurify from "dompurify";
import { formatMoney } from "~/utils/fn";
import moment from "moment";

const InfoCell = ({ title, value, unit = "" }) => {
  return (
    <tr>
      <td className="border p-3 text-center">{title}</td>
      <td className="border p-3 text-center">{value}</td>
      <td className="border p-3 text-center">{unit}</td>
    </tr>
  );
};

const PropertyDetail = () => {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState();
  useEffect(() => {
    const fetchDetailProperty = async () => {
      const response = await apiGetDetailProperty(id);
      if (response.success) {
        setPropertyDetail(response.data);
      }
    };

    fetchDetailProperty();
  }, [id]);
  return (
    <div className="w-full pb-[500px]">
      <div className="relative w-full">
        <img
          src="/properties_banner.png"
          alt=""
          className="w-full object-contain"
        />
        <div className="absolute inset-0 text-white flex flex-col justify-center items-center">
          <h1 className="text-[48px] font-medium">Chi Tiết Dự Án</h1>
          <div>
            <BreadCrumb />
          </div>
        </div>
      </div>
      {propertyDetail && (
        <div className="w-main mx-auto my-8">
          {propertyDetail.images && <Images images={propertyDetail.images} />}
          <div className="my-8 grid grid-cols-10 gap-4">
            <div className="col-span-7 flex flex-col gap-6">
              <h1 className="font-bold text-2xl line-clamp-2">
                {propertyDetail.name}
              </h1>
              <span className="flex items-center">
                <GrLocation size={20} />
                <span>{propertyDetail.address}</span>
              </span>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(propertyDetail.description),
                }}
              ></div>
              <div>
                <h2 className="font-bold text-lg text-main-600">
                  Thông tin chi tiết
                </h2>
                <table className="w-full table-fixed">
                  <thead>
                    <tr>
                      <th className="border p-3 text-center bg-main-300">
                        Đặc tính
                      </th>
                      <th className="border p-3 text-center bg-main-300">
                        Giá trị
                      </th>
                      <th className="border p-3 text-center bg-main-300">
                        Đơn vị
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <InfoCell
                      title="Giá"
                      value={formatMoney(propertyDetail.price)}
                      unit="VNĐ"
                    />
                    <InfoCell
                      title="Diện tích"
                      value={formatMoney(propertyDetail.propertySize)}
                      unit={
                        <span>
                          m<sup>2</sup>
                        </span>
                      }
                    />
                    <InfoCell
                      title="Loại hình"
                      value={propertyDetail.rPropertyType?.name}
                    />
                    <InfoCell
                      title="Năm xây dựng"
                      value={propertyDetail.yearBuilt}
                    />
                    <InfoCell
                      title="Loại giao dịch"
                      value={propertyDetail.listingType}
                    />
                    <InfoCell
                      title="Phòng tắm"
                      value={propertyDetail.bathRoom}
                      unit="phòng"
                    />
                    <InfoCell
                      title="Phòng ngủ"
                      value={propertyDetail.bedRoom}
                      unit="phòng"
                    />
                    <InfoCell
                      title="Trạng thái"
                      value={propertyDetail.isAvailable ? "Có" : "Không"}
                    />
                    <InfoCell
                      title="Ngày đăng"
                      value={moment(propertyDetail.createdAt).format(
                        "DD/MM/YYYY"
                      )}
                    />
                  </tbody>
                </table>
              </div>
              <div>
                <Map address={propertyDetail.address} />
              </div>
            </div>
            <div className="col-span-3 flex flex-col gap-6">
              <BoxInfo
                role="Môi giới"
                roleStyle="text-green-600"
                data={propertyDetail.rPostedBy}
              />
              <BoxInfo
                role="Chủ sở hữu"
                roleStyle="text-red-600"
                data={propertyDetail.rOwner}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
