import React from "react";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as GrowIcon } from "@/assets/icons/footerPet.svg";
import { ReactComponent as RankingIcon } from "@/assets/icons/footerRanking.svg";
import { ReactComponent as MypageIcon } from "@/assets/icons/footerMy.svg";
import {
    FooterContainer,
    FooterItemWrapper,
    FooterText
} from "./Footer.styles";

interface FooterItemProps {
    icon: React.ReactElement;
    active: boolean;
    label: string;
}

export const FooterItem: React.FC<FooterItemProps> = ({
    icon,
    active,
    label
}) => (
    <FooterItemWrapper active={active}>
        {icon}
        <FooterText>{label}</FooterText>
    </FooterItemWrapper>
);

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterItem icon={<HomeIcon />} active={true} label="피드" />
            <FooterItem icon={<GrowIcon />} active={false} label="키우기" />
            <FooterItem icon={<RankingIcon />} active={false} label="랭킹" />
            <FooterItem icon={<MypageIcon />} active={false} label="My" />
        </FooterContainer>
    );
};

export default Footer;
