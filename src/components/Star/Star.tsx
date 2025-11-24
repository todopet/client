import React from "react";
import { ReactComponent as StarIcon } from "@/assets/icons/star.svg";

const fullColor = "#FFE210";
const emptyColor = "#F2F2F2";

interface StarProps {
    status: "full" | "empty";
}

function Star({ status }: StarProps) {
    const fill = status === "full" ? fullColor : emptyColor;
    return <StarIcon style={{ fill }} />;
}
export default Star;
