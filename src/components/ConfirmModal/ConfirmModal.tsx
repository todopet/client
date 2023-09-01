import React, { PropsWithChildren } from "react";
import {
    Container,
    ModalWrap,
    ButtonWrap,
    Text,
    Button
} from "./ConfirmModal.styles";

interface ConfirmModalProps extends PropsWithChildren {}

const ConfirmModal: React.FC<ConfirmModalProps> = (props) => {
    const { children } = props;
    console.log(children);
    return (
        <Container>
            <ModalWrap>{children}</ModalWrap>
        </Container>
    );
};

export default ConfirmModal;
