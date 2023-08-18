import React, { useState } from "react";
import {
    ModalBg,
    ModalWrap,
    Item,
    Quantity,
    BtnWrap
} from "./ActionModal.styles";

import EditBtn from "@/components/pages/Pet/Item/EditBtn";
import ChangeQtyBtn from "@/components/pages/Pet/Item/ChangeQtyBtn";

interface modalTypeProps {
    modalType: "useModal" | "discardModal";
}
export default function ActionModal({ modalType }: modalTypeProps) {
    //퍼블리싱테스트를 위해 기본값을 true로 설정함 -> 추후 작업시 false로 변경해주세요!
    const [openModal, setOpenModal] = useState<boolean>(true);

    return (
        <>
            {openModal && (
                <>
                    <ModalBg onClick={() => setOpenModal(false)} />
                    <ModalWrap>
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
                            />
                            <div>1</div>
                            <ChangeQtyBtn
                                modalType={modalType}
                                operationType="increase"
                            />
                        </Quantity>
                        <BtnWrap>
                            <EditBtn modalType={modalType} btnType="confirm" />
                            <EditBtn modalType={modalType} btnType="cancel" />
                        </BtnWrap>
                    </ModalWrap>
                </>
            )}
        </>
    );
}
