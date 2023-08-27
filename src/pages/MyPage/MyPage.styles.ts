import styled from 'styled-components';
import Button from "@/components/Button/Button";
import { MyButton } from './MyPage';

// UserInfo 컴포넌트 내의 UpdateIcon 클릭 시 모달창을 위한 position relative
const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center; 
`

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 85%;
`

const ActivityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    justify-content: center;
    gap: 2rem;
    padding: 5% 0 5% 0;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    height: 80px;
`

const MypageButton = styled(MyButton)`
	background-color: ${props => props.color};
    border: none; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
	width: 140px;
	height: 55px;
    border-radius: 10px;
`

const AlertText = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    justify-content: center;
    align-items: center;
    flex-basis: 60%;
`

const Text = styled.p`
    font-size: 15px;
    margin: 0;
`

const ModalButtonArea = styled.div`
    display: flex;
    gap: 1rem;
    flex-basis: 40%;
    justify-content: center;
    align-items: flex-start;
`

const NewButton = styled(MypageButton)`
    width: 120px;
    height: 40px;
    box-shadow: none;
`

export { MyPageWrapper, ContentWrapper, ActivityWrapper, ButtonWrapper, MypageButton, AlertText, Text, ModalButtonArea, NewButton };