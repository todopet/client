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
            >("get", "/users/user");
            setNickname(response.data.nickname);
        } catch (error) {
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    // const changeNickname = (e: any) => {
    //     const inputValue = e.target.value;
    //     setNickname(inputValue);

    //      // 유효성 검사를 수행합니다.
    //     if (/[^a-zA-Z0-9가-힣]/.test(nickname) || nickname.length > 12) {
    //         setError('닉네임은 12글자 이하의 영문, 숫자, 한글로 이루어져야 합니다.');
    //     } else {
    //         setError('');
    //     }

    //     console.log(nickname);
    //     console.log(error);
    // }

    // useEffect(() => {
    //     // 상태가 변경될 때마다 실행되는 코드
    //     if (nickname.length > 6) {
    //         setError('닉네임은 6글자 이하여야 합니다.');
    //     } else {
    //         setError('');
    //     }
    // }, [nickname]);

    const [charCount, setCharCount] = useState(0);

    useEffect(() => {
        if (charCount > 6) {
        setError('닉네임은 한글 6자, 영어 12자까지 입력 가능합니다.');
        } else {
        setError('');
        }
    }, [charCount]);

    const changeNickname = ({ target }: ChangeEvent<HTMLInputElement>) => {
        const { value } = target;
        // const inputValue = e.target.value;
        setNickname(value);

        let count = 0;
        for (let i = 0; i < value.length; i++) {
            // 한글 여부를 판단하여 카운트 증가
            if (/[ㄱ-ㅎ가-힣]/.test(value[i])) {
                count += 1;
            } 
            if (/[a-zA-Z]/.test(value[i])) {
                count += 0.5;
            }
        }

        setCharCount(count);
    };

    console.log(nickname);
    console.log(error);
    console.log(charCount);

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

            if(response.data) {  // 닉네임이 제대로 변경이 되었을 때
                alert("닉네임이 수정되었습니다!");
            }
            else {  // 글자 제한을 통과하지 못해 변경이 되지 않았을때
                return;  // 닉네임 변경 버튼 눌러도 반응없음
            }
            navigate(0);  // 페이지 새로고침
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
                                <ModalInputArea>
                                    <ModalInput
                                        type="text"
                                        value={nickname}
                                        onChange={changeNickname}
                                        // onChange={(e: any) =>
                                        //     setNickname(e.target.value)
                                        // }
                                        style={{ borderColor: error ? 'red' : '' }}
                                    />
                                    <ErrorText error={error}>{error}</ErrorText>
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
