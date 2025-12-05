import goldIcon from "@/assets/images/icons/goldmedal.svg";
import silverIcon from "@/assets/images/icons/silvermedal.svg";
import bronzeIcon from "@/assets/images/icons/bronzemedal.svg";

interface IconProps {
    rank: number;
}

export const Icon = ({ rank }: IconProps) => {
    switch (rank) {
        case 1:
            return <img src={goldIcon} alt="1위" />;
        case 2:
            return <img src={silverIcon} alt="2위" />;
        case 3:
            return <img src={bronzeIcon} alt="3위" />;
        default:
            return null;
    }
}