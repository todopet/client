import Spinner from "@/assets/images/spinner.gif";
import { googleIcon } from "@/modules/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

const Login = () => {
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);
    const setError = useAuthStore((state) => state.setError);

    const handleLoginClick = async () => {
        clearError();
        // 백엔드에서 리다이렉트
        const base = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";
        document.location.href = base + "/login";
    };

    const location = useLocation();

    useEffect(() => {
        clearError();

        return () => {
            clearError();
        };
    }, [clearError]);

    useEffect(() => {
        const hash = location.hash.split("#")[1];
        if (hash) {
            const uri = decodeURIComponent(hash);
            const queries = uri.split("&");
            const queryParams = queries.map((el) => el.split("="));
            const reason = queryParams[2]?.[1];
            if (reason) {
                setError(reason);
            }
        }
    }, [location.hash, setError]);

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center mb-[30%]">
                <div className="flex flex-col items-center justify-center">
                    <div className="font-extrabold text-[2.5rem]">Todo Pet</div>
                    <img src={Spinner} alt="Login" className="w-[280px] mt-2 mb-6" />
                    <div className="text-[#8d8d8d] text-lg font-medium mt-[10px]">
                        할 일을 완료하며, 펫과 함께 성장하세요.
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={handleLoginClick}
                className="flex w-[19rem] h-14 rounded-[0.8rem] border border-[#c9c9c9] bg-white items-center justify-center cursor-pointer"
            >
                <img src={googleIcon} alt="Google" className="w-[45px] h-[45px] mt-0.5 ml-[10px]" />
                <div className="flex w-[13rem] text-lg font-medium tracking-[0.03375rem] text-[#5e5e5e] text-center items-center justify-center">
                    구글 계정으로 로그인
                </div>
            </button>
            {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
        </div>
    );
};

export default Login;
