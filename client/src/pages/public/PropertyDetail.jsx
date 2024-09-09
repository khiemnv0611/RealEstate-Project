import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetDetailProperty, apiGetProperties } from "~/apis/properties";
import {
  BoxInfo,
  BreadCrumb,
  Images,
  InputForm,
  InputText,
  Map,
  RelatedPost,
} from "~/components";
import { GrLocation } from "react-icons/gr";
import DOMPurify from "dompurify";
import { formatMoney } from "~/utils/fn";
import moment from "moment";
import { useForm } from "react-hook-form";
import EmojiPicker from "emoji-picker-react";
import { FaRegSmile } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

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
  const {
    register,
    formState: { errors },
    value,
    onChange,
  } = useForm();
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState();
  const [relatedProperties, setRelatedProperties] = useState({
    propertyType: null,
    listingTypes: null,
  });

  const [inputValue, setInputValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // const handleEmojiSelect = (emojiData, event) => {
  //   setInputValue((prevInputValue) => prevInputValue + emojiData.emoji);
  // };
  const handleInputChange = (e) => {
    setInputValue(e.target.value); // Cập nhật state khi người dùng gõ
  };
  const handleEmojiSelect = (emojiObject) => {
    setInputValue((prevValue) => prevValue + emojiObject.emoji);
  };

  useEffect(() => {
    const fetchDetailProperty = async () => {
      const response = await apiGetDetailProperty(id);
      if (response.success) {
        setPropertyDetail(response.data);
      }
    };

    fetchDetailProperty();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const fetchRelatedPost = async () => {
      const [propertyType, listingTypes] = await Promise.all([
        apiGetProperties({
          propertyTypeId: propertyDetail.propertyTypeId,
          limit: 5,
          fields: "name,id,featuredImage,price,listingType,isAvailable",
        }),
        apiGetProperties({
          listingType: propertyDetail.listingType,
          limit: 5,
          fields: "name,id,featuredImage,price,listingType,isAvailable",
        }),
      ]);

      if (propertyType.success)
        setRelatedProperties((prev) => ({
          ...prev,
          propertyType: propertyType.properties,
        }));
      if (listingTypes.success)
        setRelatedProperties((prev) => ({
          ...prev,
          listingTypes: listingTypes.properties,
        }));
    };

    if (propertyDetail) {
      fetchRelatedPost();
    }
  }, [propertyDetail]);
  return (
    <div className="w-full">
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
              <h1 className="font-bold text-3xl line-clamp-2">
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
              <div className="flex flex-col gap-2">
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
              <div className="flex flex-col gap-2">
                <span className="font-bold text-lg text-main-600">Vị trí</span>
                <div className="bg-gray-300 h-[600px] w-full">
                  {/* <Map address={propertyDetail.address} /> */}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="font-bold text-lg text-main-600">
                  Bình luận
                </span>
                <div className="relative flex justify-between bg-gray-200 rounded-3xl p-3">
                  <InputForm
                    id="comment"
                    errors={errors}
                    placeholder="Viết bình luận..."
                    inputClassname="bg-transparent border-none text-black text-base focus:outline-none focus:ring-0 focus:border-transparent"
                    value={inputValue} // Gán giá trị từ state
                    onChange={handleInputChange} // Đảm bảo onChange cập nhật giá trị
                  />
                  <div className="flex gap-4 items-center text-gray-500">
                    <FaRegSmile
                      size={22}
                      onClick={() => setShowEmojiPicker((prev) => !prev)}
                      className="cursor-pointer"
                    />
                    <div className="cursor-pointer hover:bg-gray-300 hover:text-blue-400 rounded-full p-2">
                      <IoSend size={22} />
                    </div>
                  </div>
                  {showEmojiPicker && (
                    <div className="absolute bottom-20 right-2">
                      <EmojiPicker onEmojiClick={handleEmojiSelect} />
                    </div>
                  )}
                </div>
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
              <RelatedPost
                title="Các dự án liên quan"
                data={relatedProperties.propertyType?.rows}
              />
              <RelatedPost
                title={`Các dự án cần ${propertyDetail.listingType}`}
                data={relatedProperties.listingTypes?.rows}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetail;
