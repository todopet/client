import { useState } from "react";
import {
    ModalBg,
    ModalWrap,
    Item,
    Quantity,
    BtnWrap
} from "./ActionModal.styles";
import EditBtn from "@/components/pages/Pet/Inventory/Item/Action/EditBtn/EditBtn";
import ChangeQtyBtn from "@/components/pages/Pet/Inventory/Item/Action/ChangeQtyBtn/ChangeQtyBtn";
import { items } from "@/@types/myItems";
import axios from "axios";
import axiosRequest from "@/api";
import { res } from "@/@types";

interface modalTypeProps {
    modalType: "useModal" | "discardModal";
    state: boolean;
    setState(state: boolean): void;
    itemId: string;
    name: string;
    itemData: items[];
    setItemData(itemData: Array<items>): void;
}
export default function ActionModal({ modalType, state, setState, itemId, name, itemData, setItemData }: modalTypeProps) {
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [itemCount, setItemCount] = useState(1);
    // console.log(itemId);

    function handleUseItem() {
        // api 호출 (body param : { quantity: itemCount })
        // 현재 itemData에서 api 응답의 itemId와 같은 itemId를 가진 요소를 찾아서 걔를 api 응답으로 갱신
        // setItemData(갱신된 itemData)
    }

    async function handleDumpItem(itemId: string) {
        // api 호출 (body param : { quantity: itemCount })
        // 현재 itemData에서 api 응답의 itemId와 같은 itemId를 가진 요소를 찾아서 걔를 api 응답으로 갱신
        // setItemData(갱신된 itemData)
        // const data = { quantity: itemCount*-1 };
        // const response = await axios.patch(`http://localhost:3001/api/vi/inventories/items/${itemId}`, data);
    }

    return (
        <>
            {openModal && (
                    <ModalBg onClick={() => {
                        setOpenModal(false);
                        setState(!state);
                    }}>
                        <ModalWrap onClick={(e) => e.stopPropagation()}>
                            <Item>
                                <div>
                                    {modalType === "useModal" ? "사용할" : "버리는"}
                                </div>
                                <div>도구: {name}</div>
                            </Item>
                            <Quantity>
                                <ChangeQtyBtn
                                    modalType={modalType}
                                    operationType="decrease"
                                    onClick={() => (itemCount > 1) ? setItemCount(itemCount-1) : false}
                                    isCountPositiveNum={itemCount > 1}
                                />
                                <div>{itemCount}</div>
                                <ChangeQtyBtn
                                    modalType={modalType}
                                    operationType="increase"
                                    onClick={() => setItemCount(itemCount+1)}
                                    isCountPositiveNum={true}
                                />
                            </Quantity>
                            <BtnWrap>
                                <EditBtn 
                                    modalType={modalType} 
                                    btnType="confirm" 
                                    onClick={() => {
                                        if (modalType === "useModal") {
                                            //handleUseItem();
                                        } else if (modalType === "discardModal") {
                                            handleDumpItem(itemId);
                                        }
                                    }} />
                                <EditBtn modalType={modalType} btnType="cancel" onClick={() => {
                                    setOpenModal(false);
                                    setState(!state);
                                }} />
                            </BtnWrap>
                        </ModalWrap>
                    </ModalBg>
            )}
        </>
    );
}
