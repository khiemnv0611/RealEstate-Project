import React, { useEffect, useState } from "react";
import LottieAnimations from "../../components/animations/LottieAnimations";
import { apiGetPlans, apiRegisterPlans } from "~/apis/plan";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import path from "~/utils/path";

const MembershipPackage = () => {
  const price = 100000;
  const price1 = 500000;
  const price2 = 1000000;

  const animationUrls = [
    "", //0
    "https://lottie.host/7de3de7c-9f1c-4ec4-ac46-12361001f03a/TqD6vgPdRv.json", //1
    "https://lottie.host/f53882b9-05d5-4d1a-90dc-97f6734eebe9/FJVn4cHrZb.json", //2
    "https://lottie.host/86a9338d-42b8-42ed-8feb-39535315362a/kKEbkl1JOe.json", //3
  ];

  const navigate = useNavigate();
  const location = useLocation();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await apiGetPlans();

      if (res.success) setPlans(res.plans);
    };

    fetchData();
  }, []);

  const handleRegister = async (id, name, price) => {
    Swal.fire({
      icon: "warning",
      title: `Xác nhận đăng ký gói ${name} với giá ${Math.floor(Number(price))
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,

      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await apiRegisterPlans(id);

        if (res.success) {
          Swal.fire("Thành công!", "", "success").then(() => {
            const newPath =
              location.pathname.replace(path.MEMBERSHIP_PACKAGE, "") +
              `${path.USER_LAYOUT}/${path.PERSONAL}`;
            navigate(newPath);
          });
        } else {
          Swal.fire("Lỗi!", res.mes, "error");
        }
      }
    });
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <img
          src="/properties_banner.png"
          alt=""
          className="w-full object-contain"
          onLoad={handleImageLoad}
        />
        {isImageLoaded && (
          <div className="absolute inset-0 text-white flex justify-center items-center">
            <h1 className="text-[48px] font-medium -mt-10">Gói Hội viên</h1>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-full relative gap-6">
        {plans?.map(
          (plan, index) =>
            plan.id != 1 && (
              <div className="min-w-[460px] flex flex-col gap-6 rounded-md -mt-10 bg-white shadow-lg p-6 transition-transform border border-transparent transform hover:-translate-y-4 hover:shadow-2xl hover:border-blue-700 h-96">
                <div className="flex w-full justify-between items-center">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-1 font-bold">
                      <span>{plan.name}</span>
                    </div>
                    <span>{plan.description}</span>
                  </div>
                  <div className="w-24 h-24">
                    <LottieAnimations urls={animationUrls} index={index} />
                  </div>
                </div>
                <div>
                  <span className="text-4xl">
                    {Math.floor(plan.price)
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </span>
                  <span>đ/tháng</span>
                </div>
                {plan.id != 1 && (
                  <div
                    className="px-4 py-3 w-full font-bold text-center border border-main-800 text-main-700 rounded-md hover:bg-main-300 cursor-pointer"
                    onClick={() =>
                      handleRegister(plan.id, plan.name, plan.price)
                    }
                  >
                    Mua ngay
                  </div>
                )}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">{plan.postLimit}</span>
                    <span>tin đăng</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Thời gian mỗi bài:</span>
                    <span className="font-semibold">{plan.postDate} ngày</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>Thời hạn gói:</span>
                    <span className="font-semibold">{plan.duration} ngày</span>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div className="w-main mx-auto my-16"></div>
    </div>
  );
};

export default MembershipPackage;
