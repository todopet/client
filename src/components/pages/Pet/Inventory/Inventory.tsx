// import React, { useState } from "react";
// import {
//     ModalBg,
//     ModalWrap,
//     Title,
//     Count,
//     Header,
//     ItemList
// } from "./Inventory.styles";

// import Item from "@/components/pages/Pet/Inventory/Item/Item";
// import Divider from "@/components/Divider/Divider";
// import Nav from "@/components/pages/Pet/Inventory/Nav/Nav";

// export default function InventoryModal() {
//     //인벤토리버튼 클릭 시 openModal을 true로 설정해주기(셋팅 후 주석 지워주세요!)
//     const [openModal, setOpenModal] = useState<boolean>(true);
//     return (
//         <>
//             {openModal && (
//                 <>
//                     <ModalBg onClick={() => setOpenModal(false)} />
//                     <ModalWrap>
//                         <Header>
//                             <Title>도구</Title>
//                             <Count>{20} / 50</Count>
//                         </Header>
//                         <Nav />
//                         <Divider category={"먹이"} />
//                         <ItemList>
//                             <Item />
//                             <Item />
//                             <Item />
//                         </ItemList>
//                     </ModalWrap>
//                 </>
//             )}
//         </>
//     );
// }



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
import { useState } from 'react';

interface parameterType {
    on: boolean;
}

export default function InventoryModal({ on }: parameterType) {
    const [openModal, setOpenModal] = useState(false);
    return (
        <ModalWrap on={on}>  {/* PetArea의 State를 받음. true면 모달창 on, false면 off */}
            <Header>
                <Title>도구</Title>
                <Count>{20} / 50</Count>
            </Header>
            <Nav />
            <Divider category={"먹이"} />
            <ItemList>
                <Item />
                <Item />
                <Item />
            </ItemList>
        </ModalWrap>
    );
}
