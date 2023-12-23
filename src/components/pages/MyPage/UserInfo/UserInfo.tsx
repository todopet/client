import {
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
} from "./UserInfo.styles";
import NickName from "../NickName/NickName";
import { ChangeEvent, useEffect, useState } from "react";
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
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const getUserName = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("get", "users/user");
            setNickname(response.data.nickname);
        } catch (error) {
            alert(
                "회원 정보를 가져오는중 에러가 발생했습니다. 다시 시도해 주세요."
            );
            console.log("Error fetching pet data: ", error);
        }
    };

    useEffect(() => {
        // 상태가 변경될 때마다 실행되는 코드
        const hasWhitespace = /\s/.test(nickname);

        if (hasWhitespace) {
            setError("공백은 포함될수 없습니다.");
            return;
        }
        if (nickname.length > 8) {
            setError("닉네임은 8글자 이하여야 합니다.");
            return;
        }
        if (nickname.length > 0) {
            setError("올바른 닉네임입니다.");
        } else {
            setError("닉네임을 입력하세요.");
        }
    }, [nickname]);

    const inputColor = () => {
        if (error === "올바른 닉네임입니다.") return "#bff2bd";
        if (error === "닉네임을 입력하세요.") return "#d1d1d1";
        return "#FF5656";
    };

    const textColor = () => {
        if (error === "올바른 닉네임입니다.") return "#5bd756";
        if (error === "닉네임을 입력하세요.") return "#ababab";
        return "#ff1919";
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
            >("patch", "users/myInfo", { nickname });
            if (response.data) {
                // 닉네임이 제대로 변경이 되었을 때
                alert("닉네임이 수정되었습니다!");
            } else {
                // 글자 제한을 통과하지 못해 변경이 되지 않았을때
                return; // 닉네임 변경 버튼 눌러도 반응없음
            }
            navigate(0); // 페이지 새로고침
        } catch (error) {
            alert("닉네임 변경중 에러가 발생했습니다. 다시 시도해 주세요.");
            console.log("Error fetching pet data: ", error);
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
                                <ModalInputArea>
                                    <ModalInput
                                        type="text"
                                        value={nickname}
                                        // onChange={changeNickname}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>
                                        ) => setNickname(e.target.value)}
                                        style={{ borderColor: inputColor() }}
                                    />
                                    <ErrorText color={textColor()}>
                                        {error}
                                    </ErrorText>
                                    {/* {error && <ErrorText>{error}</ErrorText>} */}
                                </ModalInputArea>
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
