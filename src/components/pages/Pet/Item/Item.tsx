import React from "react";
import {
    ItemWrap,
    ItemInfo,
    ItemInfoRow,
    StyledCakeIcon,
    ItemName,
    Itemdescription,
    ThrowBtnStyled
} from "./Item.styles";

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
