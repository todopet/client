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
    const [activeCategory, setActiveCategory] = useState("feed");
    const [itemData, setItemData] = useState<items[]>([]);
    let totalItemAmount = 0;

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

    useEffect(() => {
        console.log(itemData);
    }, [itemData]);

    const findTargetedCategory = () => {
        if (activeCategory === "feed") return "먹이";
        if (activeCategory === "play") return "놀이";
        if (activeCategory === "rest") return "휴식";
        if (activeCategory === "wash") return "씻기";
        if (activeCategory === "hidden") return "히든";
    }

    const findItemCategory = (status: Array<string>) => {
        // 나중에 status.length가 4인것만 히든으로 넣고 2 이상인것들은 해당되는 카테고리 영역에 모두 나오게 처리해주기
        if (status.length > 1) return "히든";
        if (status[0] === "hunger") return "먹이";
        if (status[0] === "affection") return "놀이";
        if (status[0] === "condition") return "휴식";
        if (status[0] === "cleanliness") return "씻기";
    }

    // console.log( itemData.filter(el => findItemCategory(el.info.status) === findTargetedCategory()) );
    const currentCategoryItem = itemData.filter(el => findItemCategory(el.info.status) === findTargetedCategory());
    const sortedItem = currentCategoryItem.sort((a, b) => a.info.effect - b.info.effect);  // 아이템의 상태 회복량을 기준으로 오름차순 정렬

    itemData.map(el => totalItemAmount += el.quantity);

    return (
        <ModalWrap on={on}>  {/* PetArea의 State를 받음. true면 모달창 on, false면 off */}
            <Header>
                <Title>도구</Title>
                <Count>{totalItemAmount} / 50</Count>
            </Header>
            <Nav activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <Divider category={findTargetedCategory} />
            <ItemList>
                {sortedItem.map((e, idx) => <Item
                    key={idx}
                    url={e.info.image}
                    name={e.info.name}
                    des={e.info.description}
                    _id={e._id}
                    quantity={e.quantity}
                    itemData={itemData}
                    setItemData={setItemData} />)}
            </ItemList>
        </ModalWrap>
    );
}