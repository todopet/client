import {
    Container,
    ModalWrap,
    ButtonWrap,
    Text,
    Button
} from "@/components/pages/MyPage/WithDrawalModal/WithDrawalModal.styles";

const WithDrawalModal: React.FC = () => {
    return (
        <Container>
            <ModalWrap>
                <Text>로그아웃 하시겠어요?</Text>
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

export default WithDrawalModal;
