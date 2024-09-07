import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AuthFailure = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.error("Đăng nhập thất bại. Vui lòng thử lại.");

        // Chuyển hướng về trang đăng nhập sau vài giây
        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, [navigate]);

    return (
        <div>
            <h1>Đăng nhập thất bại, đang chuyển hướng về trang đăng nhập...</h1>
        </div>
    );
};

export default AuthFailure;
