import Input from "@/components/Input/Input";
import {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton
} from "./CategoryContent.styles";
export default function CategoryContent() {
    return (
        <>
            <Input />
            <Text>일반</Text>
            <ButtonWrap>
                <CircleButton>목표1</CircleButton>
                <CircleButton>목표2</CircleButton>
                <CircleButton>목표3</CircleButton>
            </ButtonWrap>
            <Text>종료된 목표</Text>
            <ButtonWrap>
                <CircleButton>목표4</CircleButton>
            </ButtonWrap>
            <ActionButtonWrap>
                <ActionButton>종료하기</ActionButton>
                <ActionButton>삭제</ActionButton>
            </ActionButtonWrap>
        </>
    );
}
