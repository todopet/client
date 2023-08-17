import {
    Container,
    ModalWrap,
    ButtonWrap,
    Text,
    Button
} from "@/components/pages/MyPage/LogoutModal/LogoutModal.styles";

const LogoutModal: React.FC = () => {
    return (
        <Container>
            <ModalWrap>
                <Text>OOO님의 펫이 기다리고 있어요!</Text>
                <Text>OOO님의 펫을 두고 떠나시려구요?</Text>
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

export default LogoutModal;
