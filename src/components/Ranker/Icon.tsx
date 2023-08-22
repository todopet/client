import React from "react";

interface IconProps {
    rank: number;
}

function Icon({ rank }: IconProps) {
    switch (rank) {
        case 1:
            return <img src="gold-icon.png" alt="1위" />;
        case 2:
            return <img src="silver-icon.png" alt="2위" />;
        case 3:
            return <img src="bronze-icon.png" alt="3위" />;
        default:
            return null;
    }
}

export default Icon;
