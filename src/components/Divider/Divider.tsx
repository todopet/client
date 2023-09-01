import React from "react";

import { DividerWrap, Line } from "./Divider.styles";
interface DividerProps {
    category: () => string | undefined;
}

export default function Divider({ category }: DividerProps) {
    const itemCategory = category();
    const haslength = !!itemCategory;
    return (
        <DividerWrap>
            <Line haslength={haslength.toString()}></Line>
            {haslength && <div>{itemCategory}</div>}
            <Line haslength={haslength.toString()}></Line>
        </DividerWrap>
    );
}
