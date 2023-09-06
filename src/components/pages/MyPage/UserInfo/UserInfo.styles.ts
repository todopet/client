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
    gap: .5rem;
    width: 100%;
    height: 15%;
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
`;

const UserInfoArea = styled.div`
    display: flex;
    flex-direction: column;
    height: 80px;
    width: 50%;
`;

const UserName = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: .3rem;
    align-items: center;
    height: 55%;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 auto;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    height: 100vh;
    width: 390px;

    background: rgba(0, 0, 0, 0.58);
    backdrop-filter: blur(2px);
    z-index: 1000;
`;

const Modal = styled.div`
    width: 80%;
    height: 190px;
    border-radius: 25px;
    background-color: white;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const ModalTitle = styled.p`
    font-weight: bold;
    font-size: 1.1rem;
    padding-left: 10%;
    margin-bottom: 0;
`;

const ModalInputArea = styled.div`
    width: 100%;
    height: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .3rem;
`

const ModalInput = styled.input`
    width: 75%;
    height: 45%;
    border: 2px solid #bff2bd;
    border-radius: 20px;
    margin: 10px auto 0;
    padding: 0 10px;

    &:focus {
        outline: none; /* 포커스 아웃라인 제거 */
    }
`;

// const ErrorText = styled.span`
//     height: 14px;
//     width: 100%;
//     color: red;
//     font-size: 10.5px;
//     // padding-left: 12%;
//     text-align: center;
// `
const ErrorText = styled.span<{ error: string }>`
    opacity: ${props => props.error ? 1 : 0};
    height: 14px;
    width: 100%;
    color: red;
    font-size: 10.5px;
    // padding-left: 12%;
    text-align: center;
`

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
    display: flex;
    justify-content: flex-end;
    padding-right: 4px;
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
    ModalInputArea,
    ModalInput,
    ErrorText,
    ModalButtonArea,
    DeleteButton,
    UpdateButton,
    JoinDate
};
