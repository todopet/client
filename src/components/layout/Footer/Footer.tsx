import React from "react";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as GrowIcon } from "@/assets/icons/footerPet.svg";
import { ReactComponent as RankingIcon } from "@/assets/icons/footerRanking.svg";
import { ReactComponent as MypageIcon } from "@/assets/icons/footerMy.svg";
import {
    FooterContainer,
    FooterItemWrapper,
    FooterText,
    StyledLink
} from "./Footer.styles";
import { useLocation } from "react-router-dom";

interface FooterItemProps {
    to: string;
    icon: React.ReactElement;
    label: string;
}

export const FooterItem: React.FC<FooterItemProps> = ({ to, icon, label }) => {
    const location = useLocation();

    const isActive = location.pathname === to;

    return (
        <StyledLink to={to}>
            <FooterItemWrapper active={isActive.toString()}>
                {icon}
                <FooterText>{label}</FooterText>
            </FooterItemWrapper>
        </StyledLink>
    );
};

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterItem to="/todo" icon={<HomeIcon />} label="피드" />
            <FooterItem to="/pet" icon={<GrowIcon />} label="키우기" />
            <FooterItem to="/rank" icon={<RankingIcon />} label="랭킹" />
            <FooterItem to="/mypage" icon={<MypageIcon />} label="My" />
        </FooterContainer>
    );
};

export default Footer;
