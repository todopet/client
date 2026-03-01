import Spinner from "@/assets/images/spinner.gif";
import { googleIcon } from "@/modules/icons";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";
import { env } from "@/config/env";
import { parseHashParams, validateEnum } from "@/utils/urlValidator";

const AUTH_ERROR_REASONS = ["auth_failed", "session_expired", "invalid_token"] as const;
type AuthErrorReason = (typeof AUTH_ERROR_REASONS)[number];

const AUTH_ERROR_MESSAGES: Record<AuthErrorReason, string> = {
    auth_failed: "로그인에 실패했습니다. 다시 시도해 주세요.",
    session_expired: "세션이 만료되었습니다. 다시 로그인해 주세요.",
    invalid_token: "유효하지 않은 인증 토큰입니다. 다시 로그인해 주세요.",
};

const Login = () => {
    const error = useAuthStore((state) => state.error);
    const clearError = useAuthStore((state) => state.clearError);
    const setError = useAuthStore((state) => state.setError);

    const handleLoginClick = async () => {
        clearError();
        // 백엔드에서 리다이렉트
        const base = env.apiUrl.endsWith("/") ? env.apiUrl.slice(0, -1) : env.apiUrl;
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
        const hashParams = parseHashParams(location.hash);
        const reason = hashParams.reason;

        if (validateEnum(reason, AUTH_ERROR_REASONS)) {
            setError(AUTH_ERROR_MESSAGES[reason]);
        }
    }, [location.hash, setError]);

    return (
        <main className="flex flex-col items-center justify-center h-full" aria-label="로그인 페이지">
            <section className="flex flex-col items-center justify-center mb-[30%]">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="font-extrabold text-[2.5rem] m-0">Todo Pet</h1>
                    <img src={Spinner} alt="" aria-hidden="true" className="w-[280px] mt-2 mb-6" />
                    <p className="text-[#8d8d8d] text-lg font-medium mt-[10px]">
                        할 일을 완료하며, 펫과 함께 성장하세요.
                    </p>
                </div>
            </section>
            <button
                type="button"
                onClick={handleLoginClick}
                aria-label="구글 계정으로 로그인"
                className="flex w-[19rem] h-14 rounded-[0.8rem] border border-[#c9c9c9] bg-white items-center justify-center cursor-pointer"
            >
                <img src={googleIcon} alt="" aria-hidden="true" className="w-[45px] h-[45px] mt-0.5 ml-[10px]" />
                <span className="flex w-[13rem] text-lg font-medium tracking-[0.03375rem] text-[#5e5e5e] text-center items-center justify-center">
                    구글 계정으로 로그인
                </span>
            </button>
            {error && <p className="mt-4 text-sm text-red-500" role="alert">{error}</p>}
        </main>
    );
};

export default Login;
