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


interface modalTypeProps {
    modalType: "useModal" | "discardModal";
    state: boolean;
    setState(state: boolean): void;
    itemId: string;
}
export default function ActionModal({ modalType, state, setState, itemId }: modalTypeProps) {
    const [openModal, setOpenModal] = useState<boolean>(true);
    const [itemCount, setItemCount] = useState(1);
    // console.log(itemId);
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
                                <div>도구: {"사과"}</div>
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
                                <EditBtn modalType={modalType} btnType="confirm" onClick={() => {}} />
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
