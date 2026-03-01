import Spinner from "@/assets/images/spinner.gif";

export const Loading = () => {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="로딩 중"
            className="fixed inset-0 z-[60] flex items-center justify-center bg-white/70 backdrop-blur-[1px]"
        >
            <img
                src={Spinner}
                alt=""
                aria-hidden="true"
                className="w-[200px] h-[200px]"
            />
            <span className="sr-only">콘텐츠를 불러오고 있습니다.</span>
        </div>
    );
}
