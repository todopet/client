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
import { useState, useEffect } from "react";
import axios from "axios";
import axiosRequest from "@/api";
import { res } from "@/@types/index";

interface userinfoType {
    id: string;
    picture: string;
    name: string;
    date: string;
}

export function UserInfo({ id, picture, name, date }: userinfoType) {
    const [state, setState] = useState(false);
    const [nickname, setNickname] = useState("");
    async function getUserName() {
        try {
            const response: res<any> = await axios.get(
                `http://localhost:3001/api/v1/users/user`
            );
            console.log(response.data);
            setNickname(response.data.nickname);
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    }
    const handleClick = () => {
        getUserName();
        setState(!state);
    };

    // useEffect(() => {
    //     getUserName();
    // }, []);

    const handleNicknameChange = async () => {
        try {
            const response: res<any> = await axios.patch(
                `http://localhost:3001/api/v1/users/myInfo`,
                { nickname: "메타몽" }
            );
            alert("닉네임이 수정되었습니다!"); // 사용자에게 알림
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
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
                                        onClick={handleClick}
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
