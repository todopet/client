import styled from 'styled-components';
import Button from "@/components/Button/Button";

// UserInfo 컴포넌트 내의 UpdateIcon 클릭 시 모달창을 위한 position relative
const MyPageWrapper = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
`

const ActivityWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 50%;
    justify-content: center;
    gap: 2rem;
`

const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    height: 80px;
`

const MypageButton = styled(Button)`
	background-color: ${props => props.color};
    border: none; 
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2);
    cursor: pointer;
	width: 140px;
	height: 55px;
    border-radius: 10px;
`

export { MyPageWrapper, ActivityWrapper, ButtonWrapper, MypageButton };