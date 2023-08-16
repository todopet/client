import React from "react";
import styled from "styled-components";

import Item from "@/components/pages/Pet/Item/Item";

export default function InventoryModal() {
    return (
        <ModalWrap>
            <Item />
        </ModalWrap>
    );
}

const ModalWrap = styled.div`
    width: 100%;
    height: 585px;
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`;
