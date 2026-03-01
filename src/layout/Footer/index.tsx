import React from "react";
import { HomeIcon, GrowIcon, RankingIcon, MypageIcon } from "@/modules/icons";
import { Link, useLocation } from "react-router-dom";

interface FooterItemProps {
  to: string;
  icon: string; // URL asset
  label: string;
}

export const FooterItem: React.FC<FooterItemProps> = ({ to, icon, label }) => {
  const location = useLocation();

  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={[
        "no-underline flex flex-col items-center cursor-pointer text-center text-[10px] font-normal",
        isActive ? "text-black" : "text-[#ADADAD]",
      ].join(" ")}
      aria-current={isActive ? "page" : undefined}
      aria-label={`${label} 페이지로 이동`}
    >
      <img src={icon} alt="" aria-hidden="true" loading="lazy" decoding="async" />
      <span className="mt-1 text-[10px] font-normal">{label}</span>
    </Link>
  );
};

export const Footer: React.FC = () => {
  return (
    <footer>
      <nav
        className="fixed bottom-0 z-10 w-full left-1/2 -translate-x-1/2 h-[70px] bg-white flex justify-around items-center"
        aria-label="하단 네비게이션"
      >
      <FooterItem to="/todo" icon={HomeIcon} label="피드" />
      <FooterItem to="/pet" icon={GrowIcon} label="키우기" />
      <FooterItem to="/rank" icon={RankingIcon} label="랭킹" />
      <FooterItem to="/mypage" icon={MypageIcon} label="My" />
      </nav>
    </footer>
  );
};
