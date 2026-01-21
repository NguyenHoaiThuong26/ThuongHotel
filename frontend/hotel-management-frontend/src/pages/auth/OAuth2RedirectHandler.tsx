import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserRoles, hasRoleSync } from "../../utils/auth";
import { toast } from "react-hot-toast";

const OAuth2RedirectHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const processLogin = async () => {
            const token = searchParams.get("token");
            if (token) {
                // console.log("Token from OAuth2:", token);
                localStorage.setItem("token", token);
                try {
                    const roles = await getUserRoles();
                    if (hasRoleSync(roles, "ADMIN") || hasRoleSync(roles, "STAFF") || hasRoleSync(roles, "RECEPTIONIST")) {
                        toast.success("Đăng nhập thành công");
                        navigate("/admin");
                    } else {
                        toast.success("Đăng nhập thành công");
                        // Use window.location.href to force a full reload and ensure clean state
                        window.location.href = "/";
                    }
                } catch (error) {
                    console.error("Error fetching roles:", error);
                    toast.error("Lỗi xác thực người dùng");
                    navigate("/login");
                }
            } else {
                // console.error("No token found in redirection");
                navigate("/login");
            }
        };

        processLogin();
    }, [searchParams, navigate]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="ml-3 text-slate-600">Đang xử lý đăng nhập...</p>
        </div>
    );
};

export default OAuth2RedirectHandler;
