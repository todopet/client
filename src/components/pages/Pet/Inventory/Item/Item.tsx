import { useState } from "react";
import {
    ItemWrap,
    ItemInfo,
    ItemInfoRow,
    ItemIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
} from "./Item.styles";

import ItemQtyLabel from "@/components/pages/Pet/Inventory/Item/ItemQtyLavel/ItemQtyLabel";
import DiscardBtn from "@/components/pages/Pet/Inventory/Item/DiscardBtn/DiscardBtn";
import ActionModal from "./Action/ActionModal";

interface itemPropsType {
    url: string;
    name: string;
    des: string;
    _id: string;
    quantity: number;
}

export default function Item({ url, name, des, _id, quantity }: itemPropsType) {
    const [ discard, setDiscard ] = useState(false);
    const [ use, setUse ] = useState(false);
    console.log(use, discard);
    return (
        <ItemWrap>
            <ItemInfo onClick={() => setUse(!use)}>
                <ItemIcon imageurl={url} />
                <ItemQtyLabel count={quantity} />
            </ItemInfo>
            <ItemInfo>
                <ItemInfoRow>
                    <ItemName>{name}</ItemName>
                    <DiscardBtnStyled>
                        <DiscardBtn onClick={(e) => { e.stopPropagation(); setDiscard(!discard); }} />
                    </DiscardBtnStyled>
                </ItemInfoRow>
                <Itemdescription>
                    {des}
                </Itemdescription>
            </ItemInfo>
            {/* 사용하거나 버릴때 호출하는 api 경로의 파라미터는 _id */}
            { discard && <ActionModal modaltype="discardModal" state={discard} setState={setDiscard} itemId={_id} name={name} quantity={quantity} /> }
            { use && <ActionModal modaltype="useModal" state={use} setState={setUse} itemId={_id} name={name} quantity={quantity} /> }
        </ItemWrap>
    );
}