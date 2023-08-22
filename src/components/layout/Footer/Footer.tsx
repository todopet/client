import React from "react";
import { ReactComponent as HomeIcon } from "@/assets/images/home.svg";
import { ReactComponent as GrowIcon } from "@/assets/images/footerPet.svg";
import { ReactComponent as RankingIcon } from "@/assets/images/footerRanking.svg";
import { ReactComponent as MypageIcon } from "@/assets/images/footerMy.svg";
import {
    FooterContainer,
    FooterItemWrapper,
    FooterText
} from "./Footer.styles";
import { Link } from "react-router-dom";

interface FooterItemProps {
    to: string;
    icon: React.ReactElement;
    active: boolean;
    label: string;
}

export const FooterItem: React.FC<FooterItemProps> = ({
    to,
    icon,
    active,
    label
}) => (
    <Link to={to}>
        <FooterItemWrapper active={active}>
            {icon}
            <FooterText>{label}</FooterText>
        </FooterItemWrapper>
    </Link>
);

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterItem
                to="/todo"
                icon={<HomeIcon />}
                active={true}
                label="피드"
            />
            <FooterItem
                to="/pet"
                icon={<GrowIcon />}
                active={false}
                label="키우기"
            />
            <FooterItem
                to="/rank"
                icon={<RankingIcon />}
                active={false}
                label="랭킹"
            />
            <FooterItem
                to="/mypage"
                icon={<MypageIcon />}
                active={false}
                label="My"
            />
        </FooterContainer>
    );
};

export default Footer;
