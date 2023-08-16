import React from "react";
import styled from "styled-components";

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
const DividerWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    & > div {
        font-size: 12px;
    }
`;
const Line = styled.div`
    width: 46%;
    height: 1px;
    background-color: #dfdfdf;
`;
