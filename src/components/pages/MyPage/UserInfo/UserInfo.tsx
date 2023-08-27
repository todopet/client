import {
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
} from "./UserInfo.styles";
import NickName from "../NickName/NickName";
import { useState } from "react";

interface userinfoType {
    picture: string;
    name: string;
    date: string;
}

export function UserInfo({ picture, name, date }: userinfoType) {
    const [state, setState] = useState(false);
    const handleClick = () => {
        setState(!state);
    };
    return (
        <UserInfoWrapper>
            <UserIcon imagePath={picture}></UserIcon>
            <UserInfoArea>
                <UserName>
                    <NickName name={name}></NickName>
                    <UpdateIcon
                        className={""}
                        onClick={handleClick}
                    ></UpdateIcon>
                    {state && (
                        <ModalBackdrop>
                            <Modal>
                                <ModalTitle>닉네임 변경하기</ModalTitle>
                                <ModalInput /> {/* 임시 인풋창 */}
                                <ModalButtonArea>
                                    <DeleteButton
                                        className=""
                                        onClick={handleClick}
                                    >
                                        취소
                                    </DeleteButton>
                                    <UpdateButton
                                        className=""
                                        onClick={handleClick}
                                    >
                                        닉네임 변경
                                    </UpdateButton>
                                </ModalButtonArea>
                            </Modal>
                        </ModalBackdrop>
                    )}
                </UserName>
                <JoinDate>가입일 : {date}</JoinDate>
            </UserInfoArea>
        </UserInfoWrapper>
    );
}

interface classType {
    className: string;
    onClick(): void;
    children?: React.ReactNode;
}

export function Icon({ className, onClick }: classType) {
    return <div className={className} onClick={onClick}></div>;
}

export function ModalButton({ className, onClick, children }: classType) {
    return (
        <button className={className} onClick={onClick}>
            {children}
        </button>
    );
}
