import React from "react";
import { StarIcon } from "@/modules/icons";

interface StarProps {
    status: "full" | "empty";
}

export const Star = ({ status }: StarProps) => {
    const style: React.CSSProperties = status === "full" ? {} : { filter: "grayscale(1) opacity(0.6)" };
    return <img src={StarIcon} alt="star" style={style} />;
}