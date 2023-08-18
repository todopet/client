import React from "react";
import {
    Container,
    ModalWrap,
    ButtonWrap,
    Text,
    Button
} from "./ConfirmModal.styles";

interface ConfirmModalProps {
    texts: string[];
    // onClose: () => void;
}

// 사용법
// text 배열을 넣으면 알아서 바인딩 된다.
// 보통 2개 요소가 위에 표시될 것이다.
const ConfirmModal: React.FC<ConfirmModalProps> = ({ texts }) => {
    return (
        <Container>
            <ModalWrap>
                {texts.map((text) => {
                    return <Text>{text}</Text>;
                })}
                <ButtonWrap>
                    <Button>
                        <Text>아니오</Text>
                    </Button>
                    <Button>
                        <Text>예</Text>
                    </Button>
                </ButtonWrap>
            </ModalWrap>
        </Container>
    );
};

export default ConfirmModal;
