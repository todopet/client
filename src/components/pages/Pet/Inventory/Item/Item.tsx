import React, { useState } from "react";
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
import ActionModal from "./Action/ActionModal";


export default function Item() {
    const [ discard, setDiscard ] = useState(false);
    const [ use, setUse ] = useState(false);

    return (
        <ItemWrap>
            <ItemInfo onClick={() => setUse(!use)}>
                <StyledCakeIcon />
                <ItemQtyLabel count={2} />
            </ItemInfo>
            <ItemInfo>
                <ItemInfoRow>
                    <ItemName>케이크</ItemName>
                    <DiscardBtnStyled>
                        <DiscardBtn onClick={(e) => { e.stopPropagation(); setDiscard(!discard); }} />
                    </DiscardBtnStyled>
                </ItemInfoRow>
                <Itemdescription>
                    사과설명사과설명사과설명사과설명사과설명사과설명사과설명사과설명
                </Itemdescription>
            </ItemInfo>
            { discard && <ActionModal modalType="discardModal" state={discard} setState={setDiscard} /> }
            { use && <ActionModal modalType="useModal" state={use} setState={setUse} /> }
        </ItemWrap>
    );
}
