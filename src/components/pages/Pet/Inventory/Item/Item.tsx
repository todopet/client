import React from "react";
import {
    ItemWrap,
    ItemInfo,
    ItemInfoRow,
    StyledCakeIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
} from "./Item.styles";

import ItemQtyLabel from "@/components/pages/Pet/Inventory/Item/ItemQtyLavel/ItemQtyLabel";
import DiscardBtn from "@/components/pages/Pet/Inventory/Item/DiscardBtn/DiscardBtn";

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
                    <DiscardBtnStyled>
                        <DiscardBtn />
                    </DiscardBtnStyled>
                </ItemInfoRow>
                <Itemdescription>
                    사과설명사과설명사과설명사과설명사과설명사과설명사과설명사과설명
                </Itemdescription>
            </ItemInfo>
        </ItemWrap>
    );
}
