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
                <ItemInfoRow>
                    <ItemName>케이크</ItemName>
                    <ThrowBtnStyled>
                        <ThrowBtn />
                    </ThrowBtnStyled>
                </ItemInfoRow>
                <Itemdescription>
                    사과설명사과설명사과설명사과설명사과설명사과설명사과설명사과설명
                </Itemdescription>
            </ItemInfo>
        </ItemWrap>
    );
}

const ItemInfo = styled.div``;
const ItemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 132px;
    padding: 18px 18px;
    display: flex;
    flex-direction: row;

    & > ${ItemInfo}:nth-child(1) {
        position: relative;
        & > div {
            position: absolute;
            bottom: 6px;
        }
    }
    & > ${ItemInfo}:nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`;
const ItemInfoRow = styled.div`
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
const StyledCakeIcon = styled(cakeIcon)`
    width: 100px;
    height: 96px;
    margin-right: 18px;
`;

const ItemName = styled.div`
    font-size: 20px;
    color: #545353;
    align-self: flex-end;
`;
const Itemdescription = styled.div`
    font-size: 15px;
    color: #545353;
`;
const ThrowBtnStyled = styled.div`
    align-self: center;
    & > button {
        border: 0;
        background-color: transparent;
    }
`;
