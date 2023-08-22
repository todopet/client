import {
    ModalWrap,
    Title,
    Count,
    Header,
    ItemList
} from "./Inventory.styles";

import Item from "@/components/pages/Pet/Inventory/Item/Item";
import Divider from "@/components/Divider/Divider";
import Nav from "@/components/pages/Pet/Inventory/Nav/Nav";
import { useState, useEffect } from 'react';
import axiosRequest from '@/api';
import { myItems, res } from '@/@types';
import { items } from "@/@types/myItems";

interface parameterType {
    on: boolean;
}

export default function InventoryModal({ on }: parameterType) {
    const [feed, setFeed] = useState(true);
    const [play, setPlay] = useState(false);
    const [rest, setRest] = useState(false);
    const [wash, setWash] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [itemData, setItemData] = useState<items[]>([]);

    // 각 버튼의 클릭 이벤트 핸들러
    const handleFeedClick = () => {
        setFeed(true);
        setPlay(false);
        setRest(false);
        setWash(false);
        setHidden(false);
    };

    const handlePlayClick = () => {
        setFeed(false);
        setPlay(true);
        setRest(false);
        setWash(false);
        setHidden(false);
    };

    const handleRestClick = () => {
        setFeed(false);
        setPlay(false);
        setRest(true);
        setWash(false);
        setHidden(false);
    };

    const handleWashClick = () => {
        setFeed(false);
        setPlay(false);
        setRest(false);
        setWash(true);
        setHidden(false);
    };

    const handleHiddenClick = () => {
        setFeed(false);
        setPlay(false);
        setRest(false);
        setWash(false);
        setHidden(true);
    };

    async function receiveItemData() {
        try {
            const response: res<myItems> = await axiosRequest.requestAxios<res<myItems>>("get", "/inventories", {});
            const itemArray = response.data.items;
            setItemData(itemArray);
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    useEffect(() => {
        receiveItemData();
    }, []);

    console.log(itemData);

    const findTargetingCategory = () => {
        if (feed) return "먹이";
        if (play) return "놀이";
        if (rest) return "휴식";
        if (wash) return "씻기";
        if (hidden) return "히든";
    }

    const findItemCategory = (status: Array<string>) => {
        if (status.length > 1) return "히든";
        if (status[0] === "hunger") return "먹이";
        if (status[0] === "affection") return "놀이";
        if (status[0] === "condition") return "휴식";
        if (status[0] === "cleanliness") return "씻기";
    }

    // console.log( itemData.filter(el => findItemCategory(el.info.status) === findTargetingCategory()) );
    const currentCategoryItem = itemData.filter(el => findItemCategory(el.info.status) === findTargetingCategory());
    const sortedItem = currentCategoryItem.sort((a, b) => a.info.effect - b.info.effect);  // 아이템의 상태 회복량에 따라 오름차순 정렬

    return (
        <ModalWrap on={on}>  {/* PetArea의 State를 받음. true면 모달창 on, false면 off */}
            <Header>
                <Title>도구</Title>
                <Count>{itemData.length} / 50</Count>
            </Header>
            <Nav feed={feed} play={play} rest={rest} wash={wash} hidden={hidden} 
                setFeed={handleFeedClick}
                setPlay={handlePlayClick}
                setRest={handleRestClick}
                setWash={handleWashClick}
                setHidden={handleHiddenClick} />
            <Divider category={findTargetingCategory} />
            <ItemList>
                {sortedItem.map(e => <Item url={e.info.image} name={e.info.name} des={e.info.description} _id={e._id} quantity={e.quantity} />)}
                {/* <Item />
                <Item />
                <Item /> */}
            </ItemList>
        </ModalWrap>
    );
}