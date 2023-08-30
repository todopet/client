import styled from "styled-components";
import pet from "@/assets/images/pet-example.svg";
import update from "@/assets/icons/update.svg";
import { Icon } from "./UserInfo";
import { ModalButton } from "./UserInfo";
import Input from "@/components/Input/Input";
const UserInfoWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    width: 100%;
    height: 100%;
`;

interface ImagePathProps {
    imagepath: string;
}
const UserIcon = styled.div<ImagePathProps>`
    background-image: url(${(props: ImagePathProps) => props.imagepath});
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
`;
// 펫 아이콘 누르면 다시 펫 페이지로 갈 수 있게하는거 어떨까요

const UserInfoArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 80px;
`;

const UserName = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50%;
`;

const UpdateIcon = styled(Icon)`
    background-image: url(${update});
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 20px;
    height: 25px;
    cursor: pointer;

    &:hover {
        opacity: 0.5;
    }
`;

const ModalBackdrop = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Modal = styled.div`
    width: 80%;
    height: 23%;
    border-radius: 15px;
    background-color: white;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const ModalTitle = styled.p`
    font-weight: bold;
    font-size: 1rem;
    padding-left: 25px;
    margin-bottom: 0;
`;

const ModalInput = styled.input`
    width: 80%;
    height: 20%;
    border: 2px solid #bff2bd;
    border-radius: 20px;
    margin: 0 auto;
    padding: 0 10px;
`;

const ModalButtonArea = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 0.7rem;
    padding: 0 30px 20px;
`;

const DeleteButton = styled(ModalButton)`
    background-color: #aaeea8;
    border: none;
    cursor: pointer;
    width: 45px;
    height: 35px;
    border-radius: 15px;
    color: #28b666;
`;

const UpdateButton = styled(ModalButton)`
    background-color: #e7e8ea;
    border: none;
    cursor: pointer;
    width: 100px;
    height: 35px;
    border-radius: 15px;
`;

const JoinDate = styled.p`
    margin: 10px 0;
    height: 50%;
`;

export {
    UserInfoWrapper,
    UserIcon,
    UserInfoArea,
    UserName,
    UpdateIcon,
    ModalBackdrop,
    Modal,
    ModalTitle,
    ModalInput,
    ModalButtonArea,
    DeleteButton,
    UpdateButton,
    JoinDate
};
