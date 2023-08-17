import React from "react";
import styled from "styled-components";

import { ReactComponent as cakeIcon } from "@/assets/images/cake.svg"; //임시 이미지
import ItemQtyLabel from "@/components/pages/Pet/Inventory/ItemQtyLabel";
import ThrowBtn from "./ThrowBtn";

export default function Item() {
    return (
        <ItemWrap>
            <ItemInfo>
                <StyledCakeIcon />
                <ItemQtyLabel count={2} />
            </ItemInfo>
            <ItemInfo>
                <ItemName>케이크</ItemName>
                <Itemdescription>
                    사과설명사과설명사과설명사과설명사과설명사과설명사과설명사과설명
                </Itemdescription>
            </ItemInfo>
            <ThrowBtnStyled>
                <ThrowBtn />
            </ThrowBtnStyled>
        </ItemWrap>
    );
}

const ItemInfo = styled.div``;
const ItemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 124px;
    padding: 0 24px;
    margin: 20px 0;
    display: flex;
    flex-direction: row;
    align-items: center;

    & > ${ItemInfo}:nth-child(1) {
        position: relative;
        & > div {
            position: absolute;
            bottom: 4px;
            left: -8px;
        }
    }
    & > ${ItemInfo}:nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`;

const StyledCakeIcon = styled(cakeIcon)`
    width: 90px;
    height: 104px;
    margin-right: 20px;
`;

const ItemName = styled.div`
    font-size: 20px;
    color: #545353;
`;
const Itemdescription = styled.div`
    font-size: 15px;
    color: #545353;
`;
const ThrowBtnStyled = styled.div`
    align-self: flex-start;
    margin-top: 14px;
    & > button {
        border: 0;
        background-color: transparent;
    }
`;
