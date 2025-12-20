import { useState } from "react";
import {
    ItemWrap,
    ItemInfo,
    ItemImage,
    ItemDes,
    ItemInfoRow,
    ItemIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
} from "@/components/pages/Pet/Inventory/Item/Item.styles";

import { ItemQtyLabel } from "@/components/pages/Pet/Inventory/Item/ItemQtyLavel/ItemQtyLabel";
import { ThrowBtn } from "@/components/pages/Pet/Inventory/Item/DiscardBtn";
import { ActionModal } from "@/components/pages/Pet/Inventory/Item/Action/ActionModal";

interface itemPropsType {
    url: string;
    name: string;
    des: string;
    _id: string;
    quantity: number;
}

export const Item = ({
  url, name, des, _id, quantity
}: itemPropsType) => {
    const [discard, setDiscard] = useState(false);
    const [use, setUse] = useState(false);
    return (
        <ItemWrap>
            <ItemInfo onClick={() => setUse(!use)}>
                <ItemImage>
                    <ItemIcon imageurl={url} />
                    <ItemQtyLabel count={quantity} />
                </ItemImage>
                <ItemDes>
                    <ItemInfoRow>
                        <ItemName>{name}</ItemName>
                    </ItemInfoRow>
                    <Itemdescription>{des}</Itemdescription>
                </ItemDes>
            </ItemInfo>
            <DiscardBtnStyled>
                <ThrowBtn onClick={() => setDiscard(!discard) } />
            </DiscardBtnStyled>
            {/* 사용하거나 버릴때 호출하는 api 경로의 파라미터는 _id */}
            {discard && (
                <ActionModal
                    modaltype="discardModal"
                    state={discard}
                    setState={setDiscard}
                    itemId={_id}
                    name={name}
                    quantity={quantity}
                />
            )}
            {use && (
                <ActionModal
                    modaltype="useModal"
                    state={use}
                    setState={setUse}
                    itemId={_id}
                    name={name}
                    quantity={quantity}
                />
            )}
        </ItemWrap>
    );
}