import React from "react";

import { DividerWrap, Line } from "./Divider.styles";
interface DividerProps {
    category: () => string | undefined;
}

export default function Divider({ category }: DividerProps) {
    const itemCategory = category();
    return (
        <DividerWrap>
            <Line></Line>
            <div>{itemCategory}</div>
            <Line></Line>
        </DividerWrap>
    );
}
