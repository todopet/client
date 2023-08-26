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
import { items, myItems } from "@/@types/myItems";
import axiosRequest from "@/api";
import { res } from "@/@types";
import { dumpItemRes } from "@/@types/dumpItemRes";
import axios from "axios";

interface modalTypeProps {
    modalType: "useModal" | "discardModal";
    state: boolean;
    setState(state: boolean): void;
    itemId: string;
    name: string;
    quantity: number;
    itemData: items[];
    setItemData(itemData: Array<items>): void;
}
export default function ActionModal({ modalType, state, setState, itemId, name, quantity, itemData, setItemData }: modalTypeProps) {
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [itemCount, setItemCount] = useState(1);
    // console.log(itemId);

    async function receiveItemData() {
        try {
            const response: res<myItems> = await axiosRequest.requestAxios<res<myItems>>("get", "/inventories", {});
            const itemArray = response.data.items;
            setItemData(itemArray);
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
    }

    async function handleUseItem(itemId: string) {
        const data = { quantity: itemCount };
        const response = await axios.post(`http://localhost:3001/api/v1/inventories/${itemId}/use`, data);
        console.log(response);
        receiveItemData();
    }

    async function handleDumpItem(itemId: string) {
        try {
            const data = { quantity: itemCount*-1 };
            const response: res<dumpItemRes> = await axiosRequest.requestAxios<res<dumpItemRes>>("patch", `/inventories/items/${itemId}`, data);
            console.log(response);
            receiveItemData();
        } catch (error) {
            console.error("Error fetching pet data: ", error);
        }
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
                                    onClick={() => (itemCount < quantity) ? setItemCount(itemCount+1) : false}
                                    isCountPositiveNum={itemCount < quantity}
                                />
                            </Quantity>
                            <BtnWrap>
                                <EditBtn 
                                    modalType={modalType} 
                                    btnType="confirm" 
                                    onClick={() => {
                                        if (modalType === "useModal") {
                                            handleUseItem(itemId);
                                            setOpenModal(false);
                                        } else if (modalType === "discardModal") {
                                            handleDumpItem(itemId);
                                            setOpenModal(false);
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
