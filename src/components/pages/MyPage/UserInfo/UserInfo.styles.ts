import styled from 'styled-components';
import pet from '@/assets/images/pet-example.svg';
import update from '@/assets/icons/update.svg';
import { Icon } from './UserInfo';
import { ModalButton } from './UserInfo';

const UserInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    width: 100%;
    heigth: 100%;
`

const UserIcon = styled.div`
    background-image: url(${pet});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 80px;
    height: 80px;
    border-radius: 15px;
    box-shadow:
        0px 0px 1.5px rgba(0, 0, 0, 0.014),
        0px 0px 3.7px rgba(0, 0, 0, 0.02),
        0px 0px 7px rgba(0, 0, 0, 0.025),
        0px 0px 12.5px rgba(0, 0, 0, 0.03),
        0px 0px 23.4px rgba(0, 0, 0, 0.036),
        0px 0px 56px rgba(0, 0, 0, 0.05);
    cursor: pointer;
`
// 펫 아이콘 누르면 다시 펫 페이지로 갈 수 있게하는거 어떨까요


const UserInfoArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 80px;
`

const UserName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50%;
`

const UpdateIcon = styled(Icon)`
    background-image: url(${update});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 20px;
    height: 25px;
    cursor: pointer;

    &:hover {
        opacity: .5;
    }
`

// 나중에 헤더 추가하면 bottom은 헤더 높이로 수정
const ModalBackdrop = styled.div`
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`

const Modal = styled.div`
    width: 80%;
    height: 20%;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
`

const ModalTitle = styled.p`
    font-weight: bold;
    font-size: 17px;
    padding-left: 25px;
`

const ModalInput = styled.input`
    width: 80%;
    height: 20%;
    border: 2px solid #BFF2BD;
    border-radius: 20px;
    margin: 0 auto;
`

const ModalButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: .7rem;
    padding: 20px 30px;
`

const DeleteButton = styled(ModalButton)`
	background-color: #AAEEA8;
    border: none; 
    cursor: pointer;
	width: 45px;
	height: 35px;
    border-radius: 15px;
    color: #28B666;
`

const UpdateButton = styled(ModalButton)`
    background-color: #E7E8EA;
    border: none; 
    cursor: pointer;
    width: 100px;
    height: 35px;
    border-radius: 15px;
`

const JoinDate = styled.p`
    margin: 10px 0;
    height: 50%;
`

export { UserInfoWrapper, UserIcon, UserInfoArea, UserName, UpdateIcon, ModalBackdrop, Modal, ModalTitle, ModalInput, ModalButtonArea, DeleteButton, UpdateButton, JoinDate };