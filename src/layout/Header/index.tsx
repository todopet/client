import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/layout/Logo";
import { DropDown } from "@/components/DropDown";
import { HeaderMenuIcon, BluePlusIcon } from "@/modules/icons";
import { useAuthStore } from "@/store/authStore";

export const Header = () => {
  const location = useLocation();
  const nickname = useAuthStore((state) => state.user?.nickname);
  //DropDown의 props
  const listItems = [
    {
      content: "목표등록",
      href: "/category/post", // 경로 설정
      svg: <img src={BluePlusIcon} alt="add" />,
    },
    {
      content: "목표관리",
      href: "/category/list",
    },
  ];

  const isDropDown = location.pathname === "/todo";

  return (
    <header className="fixed top-0 z-10 w-full left-1/2 -translate-x-1/2 h-[60px] bg-white flex items-center justify-between px-0 box-border">
      <div>
        <Link to="/todo" className="no-underline">
          <Logo />
        </Link>
      </div>
      <div className="mr-4 flex items-center gap-2">
        {nickname && <span className="text-sm text-[#5e5e5e]">{nickname}</span>}
        {isDropDown && (
          <DropDown list={listItems}>
            <img src={HeaderMenuIcon} alt="menu" />
          </DropDown>
        )}
      </div>
    </header>
  );
};
