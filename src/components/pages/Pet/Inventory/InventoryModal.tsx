import React from "react";
import styled from "styled-components";

import Item from "@/components/pages/Pet/Item/Item";
import Divider from "@/components/Divider/Divider";
import Category from "@/components/pages/Pet/Inventory/Nav";

export default function InventoryModal() {
    return (
        <ModalWrap>
            <Header>
                <Title>도구</Title>
                <Count>{"수량"}/50</Count>
            </Header>
            <Category />
            <Divider category={"먹이"} />
            <div>
                <Item />
                <Item />
                <Item />
            </div>
        </ModalWrap>
    );
}

const ModalWrap = styled.div`
    width: 100%;
    height: 585px;
    background-color: gray;

    // background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;
const Title = styled.div`
    font-size: 12px;
`;
const Count = styled.div`
    font-size: 12px;
    padding: 4px 4px;
    border-bottom: 1.7px solid;
`;
const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 27px;
    font-weight: 500;
`;
