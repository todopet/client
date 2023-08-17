import React from "react";

import { DividerWrap, Line } from "./Divider.styles";
interface DividerProps {
    category: string;
}

export default function Divider({ category }: DividerProps) {
    return (
        <DividerWrap>
            <Line></Line>
            <div>{category}</div>
            <Line></Line>
        </DividerWrap>
    );
}
