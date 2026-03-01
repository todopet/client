import useDetectClose from "@/libs/hooks/useDetectClose";
import { KeyboardEvent, PropsWithChildren } from "react";

interface ListItem {
    content: string;
    svg?: React.ReactNode; // React 컴포넌트 형태로 받을 수 있도록 설정
    href?: string; //클릭시 주소이동을 원할시 사용
    handleClick?: () => void; //클릭시 원하는 기능 적용
}
interface ListProps extends PropsWithChildren {
    list: ListItem[];
}

//사용하려는 카테고리 목록(list)을 props로 전달, 버튼으로 사용할 컴포넌트(children)를 추가해주세요.
export const DropDown = ({ list, children }: ListProps) => {
    const [categoryIsOpen, categoryRef, categoryHandler] = useDetectClose(false);
    const hasAnySvg = list.some((item) => !!item.svg);
    const handleTriggerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            categoryHandler();
        }
    };

    return (
        <div className="flex justify-around text-base font-medium items-center">
            <div className="text-center">
                <div
                    onClick={categoryHandler}
                    onKeyDown={handleTriggerKeyDown}
                    ref={categoryRef}
                    className="flex items-center justify-center relative cursor-pointer"
                    role="button"
                    tabIndex={0}
                    aria-haspopup="menu"
                    aria-expanded={categoryIsOpen}
                    aria-label="메뉴 열기"
                >
                    {children}
                    <div
                        id="dropdown-menu"
                        className={[
                            "absolute top-[-10px] left-[-106px] w-[100px] text-center shadow-[2px_2px_8px_2px_rgba(0,0,0,0.2)] rounded-[14px] bg-white z-[9] transition-all duration-300",
                            categoryIsOpen
                                ? "opacity-100 visible translate-y-0"
                                : "opacity-0 invisible -translate-y-5"
                        ].join(" ")}
                    >
                        <ul className="list-none p-0 m-0 flex flex-col items-center" role="menu">
                            {list.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={item.handleClick}
                                    role="none"
                                    className={[
                                        "box-border border-b border-[#d9d9d9] w-full",
                                        hasAnySvg
                                            ? "flex flex-row justify-between items-center px-1"
                                            : "flex flex-row justify-center items-center px-1",
                                        index === list.length - 1 ? "border-b-0" : ""
                                    ].join(" ")}
                                >
                                    <a
                                        href={item.href}
                                        className="flex justify-inherit no-underline text-black py-[6px] px-[12px] w-full"
                                        role="menuitem"
                                    >
                                        <span className="cursor-pointer">{item.content}</span>
                                        {item.svg && item.svg}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
