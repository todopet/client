import React from "react";
import styled from "styled-components";

interface ItemQtyLabelProps {
    count: number;
}

export default function ItemQtyLabel({ count }: ItemQtyLabelProps) {
    return (
        <ItemCount>
            <span>x</span>
            <span>{count}</span>
        </ItemCount>
    );
}

const ItemCount = styled.div`
    width: 46px;
    height: 24px;
    border-radius: 25px;
    background-color: #d9d9d9;
    opacity: 0.9;
    font-size: 20px;
    color: #545353;

    & > span:nth-child(1) {
        font-size: 13px;
    }
    & > span:nth-child(2) {
        font-weight: 600;
    }
`;
