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
import { useNavigate } from "react-router-dom";
import axiosRequest from "@/api";
import { res, myUser } from "@/@types/index";

interface userinfoType {
    picture: string;
    name: string;
    date: string;
}

export function UserInfo({ picture, name, date }: userinfoType) {
    const [isNicknameModal, setIsNicknameModal] = useState(false);
    const [nickname, setNickname] = useState("");
    const navigate = useNavigate();
    const getUserName = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("get", "/users/user");
            setNickname(response.data.nickname);
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    const handleClick = () => {
        getUserName();
        setIsNicknameModal(true);
    };

    const handleClose = () => {
        setIsNicknameModal(false);
    };

    const handleNicknameChange = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("patch", "/users/myInfo", { nickname });
            alert("닉네임이 수정되었습니다!"); // 사용자에게 알림
            navigate(0); // 페이지 새로고침
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };
    return (
        <UserInfoWrapper>
            <UserIcon imagepath={picture}></UserIcon>
            <UserInfoArea>
                <UserName>
                    <NickName name={name}></NickName>
                    <UpdateIcon
                        className={""}
                        onClick={handleClick}
                    ></UpdateIcon>
                    {isNicknameModal && (
                        <ModalBackdrop>
                            <Modal>
                                <ModalTitle>닉네임 변경하기</ModalTitle>
                                <ModalInput
                                    type="text"
                                    value={nickname}
                                    onChange={(e: any) =>
                                        setNickname(e.target.value)
                                    }
                                />
                                <ModalButtonArea>
                                    <DeleteButton
                                        className=""
                                        onClick={handleClose}
                                    >
                                        취소
                                    </DeleteButton>
                                    <UpdateButton
                                        className=""
                                        onClick={handleNicknameChange}
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
