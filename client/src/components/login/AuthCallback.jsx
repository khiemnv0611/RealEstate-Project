import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUserStore } from "~/store/useUserStore";
import { toast } from "react-toastify";

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { setToken } = useUserStore();

    useEffect(() => {
        // Lấy token từ query params
        const params = new URLSearchParams(location.search);
        const token = params.get("token");

        if (token) {
            // Lưu token vào store hoặc localStorage
            setToken(token);
            toast.success("Đăng nhập thành công!");

            navigate("/");
        } else {
            // Xử lý khi không có token (đăng nhập thất bại)
            toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
            navigate("/");
        }
    }, [location, setToken, navigate]);

    return (
        <div>
            <h1>Đang xử lý đăng nhập...</h1>
        </div>
    );
};

export default AuthCallback;
