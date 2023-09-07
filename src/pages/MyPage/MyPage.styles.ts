import styled from "styled-components";
import Button from "@/components/Button/Button";
import { MyButton } from "./MyPage";

// UserInfo 컴포넌트 내의 UpdateIcon 클릭 시 모달창을 위한 position relative
const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    min-height: 700px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`;

const ActivityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 85%;
    height: 50%;
    justify-content: center;
    gap: 2rem;
`;

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 85%;
    margin-top: 30px;
`;

const MypageButton = styled(MyButton)`
    background-color: ${(props) => props.color};
    border: none;
    cursor: pointer;
    width: 50%;
    height: 48px;
    border-radius: 10px;
    font-size: 16px;
    font-weight: 500;
`;

const AlertText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    flex-basis: 60%;
`;

const Text = styled.p`
    font-size: 15px;
    margin: 0;
`;

const ModalButtonArea = styled.div`
    display: flex;
    gap: 1rem;
    flex-basis: 40%;
    justify-content: center;
    align-items: flex-start;
`;

const NewButton = styled(MypageButton)`
    width: 120px;
    height: 40px;
    box-shadow: none;
`;

const ModalText = styled.div`
    display: flex;
    height: 3.8125rem;
    flex-direction: column;
    justify-content: center;
    flex-shrink: 0;

    color: #000;
    text-align: center;
    font-family: Pretendard;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    white-space: pre-wrap;
`;

const ModalButtonWrap = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
`;

const ModalButton = styled.button`
    width: 7.07894rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    background: #e7e8ea;
    border: none;
    cursor: pointer;
`;

interface SpanTextProps {
    isred: string;
}
const SpanText = styled.span<SpanTextProps>`
    margin-bottom: 5px;
    color: ${(props) => (props.isred === "true" ? "red" : "black")};
`;

export {
    MyPageWrapper,
    ActivityWrapper,
    ButtonWrapper,
    MypageButton,
    AlertText,
    Text,
    ModalButtonArea,
    NewButton,
    Button,
    ModalButtonWrap,
    ModalButton,
    ModalText,
    SpanText
};
