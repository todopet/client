import React from "react";
import {
    Container,
    ModalWrap,
    ButtonWrap,
    Text,
    Button
} from "./ConfirmModal.styles";

interface ConfirmModalProps {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    message,
    onConfirm,
    onCancel
}) => {
    return (
        <Container>
            <ModalWrap>
                <Text>{message}</Text>
                <ButtonWrap>
                    <Button onClick={onCancel}>
                        <Text>취소</Text>
                    </Button>
                    <Button onClick={onConfirm}>
                        <Text>확인</Text>
                    </Button>
                </ButtonWrap>
            </ModalWrap>
        </Container>
    );
};

export default ConfirmModal;
