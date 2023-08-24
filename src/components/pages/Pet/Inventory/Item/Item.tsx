import React, { useState } from "react";
import {
    ItemWrap,
    ItemInfo,
    ItemInfoRow,
    // StyledCakeIcon,
    ItemIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
} from "./Item.styles";

import ItemQtyLabel from "@/components/pages/Pet/Inventory/Item/ItemQtyLavel/ItemQtyLabel";
import DiscardBtn from "@/components/pages/Pet/Inventory/Item/DiscardBtn/DiscardBtn";
import ActionModal from "./Action/ActionModal";
import { items } from "@/@types/myItems";

interface itemPropsType {
    url: string;
    name: string;
    des: string;
    _id: string;
    quantity: number;
    itemData: items[];
    setItemData(itemData: Array<items>): void;
}

export default function Item({ url, name, des, _id, quantity, itemData, setItemData }: itemPropsType) {  // itemData, setItemData 나중에 useContext로 해보기
    const [ discard, setDiscard ] = useState(false);
    const [ use, setUse ] = useState(false);

    // const splitedUrl = url.split("/");
    // const imageUrl = splitedUrl[2] + "/" + splitedUrl[3];
    // console.log(imageUrl);
    
    return (
        <ItemWrap>
            <ItemInfo onClick={() => setUse(!use)}>
                {/* <StyledCakeIcon /> */}
                <ItemIcon imageUrl={url} />
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
            { discard && <ActionModal modalType="discardModal" state={discard} setState={setDiscard} itemId={_id} name={name} quantity={quantity} itemData={itemData} setItemData={setItemData} /> }
            { use && <ActionModal modalType="useModal" state={use} setState={setUse} itemId={_id} name={name} quantity={quantity} itemData={itemData} setItemData={setItemData} /> }
        </ItemWrap>
    );
}
