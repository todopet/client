import {
    MyPageWrapper,
    ActivityWrapper,
    ButtonWrapper,
    MypageButton,
    Text,
    ModalButtonWrap,
    ModalButton,
    ModalText,
    SpanText
} from "./MyPage.styles";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";
import { res, myUser } from "@/@types/index";
import axiosRequest from "@/api";
import { formatDateToString, setKoreaTime } from "@/libs/utils/global";
import { MouseEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

interface ConfirmContentProps {
    message: React.ReactNode;
    onCancel: MouseEventHandler<HTMLButtonElement>;
    onConfirm: MouseEventHandler<HTMLButtonElement>;
}

const ConfirmContent: React.FC<ConfirmContentProps> = ({
    message,
    onCancel,
    onConfirm
}) => {
    return (
        <>
            <ModalText>{message}</ModalText>
            <ModalButtonWrap>
                <ModalButton onClick={onCancel}>
                    <Text>취소</Text>
                </ModalButton>
                <ModalButton onClick={onConfirm}>
                    <Text>확인</Text>
                </ModalButton>
            </ModalButtonWrap>
        </>
    );
};

export default function MyPage() {
    const [userInfo, setUserInfo] = useState<myUser>({
        _id: "",
        nickname: "",
        picture: "",
        createdAt: new Date(),
        withPetDate: 0,
        todoCount: 0,
        historyCount: 0
    });

    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

    const handleConfirmLogoutModal = () => {
        setIsLogoutModalOpen(true);
    };

    const handleConfirmWithdrawModal = () => {
        setIsWithdrawModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsLogoutModalOpen(false);
        setIsWithdrawModalOpen(false);
    };

    const handleConfirmLogout = async () => {
        try {
            const response: AxiosResponse = await axios.post(
                "https://kdt-sw-5-2-team14.elicecoding.com/api/v1/logout"
            );
            if (response.status === 200) {
                alert("로그아웃 처리되었습니다. ");
                navigate("/");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error withdrawing user:", error);
            alert("로그아웃에 실패하였습니다 :(");
        }
    };
    const handleConfirmWithdraw = async () => {
        try {
            const response: AxiosResponse = await axios.post(
                "https://kdt-sw-5-2-team14.elicecoding.com/api/v1/withdraw"
            );
            if (response.status === 200) {
                alert("회원 탈퇴 처리되었습니다. ");
                navigate("/");
            } else {
                throw new Error();
            }
        } catch (error) {
            console.error("Error withdrawing user:", error);
            alert("회원 탈퇴 처리 실패");
        }
    };

    const getUserInfo = async () => {
        try {
            const response: res<myUser> = await axiosRequest.requestAxios<
                res<myUser>
            >("get", "users", {});
            setUserInfo(response.data);
        } catch (error) {
            alert(
                "데이터를 가져오던 중 에러가 발생했습니다. 다시 시도해 주세요."
            );
            console.error("Error fetching userInfo data: ", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const navigate = useNavigate();
    return (
        <MyPageWrapper>
            <UserInfo
                picture={userInfo.picture}
                name={userInfo.nickname}
                date={formatDateToString(userInfo.createdAt)}
            ></UserInfo>
            <ActivityWrapper>
                <Activity
                    activityType="heart"
                    data={userInfo.withPetDate.toString()}
                ></Activity>
                <Activity
                    activityType="calendar"
                    data={userInfo.historyCount.toString()}
                ></Activity>
                <Activity
                    activityType="check"
                    data={userInfo.todoCount.toString()}
                ></Activity>
            </ActivityWrapper>
            <ButtonWrapper>
                <MypageButton
                    className=""
                    color="#F5F5F5"
                    text="로그아웃"
                    onClick={handleConfirmLogoutModal}
                />
                <MypageButton
                    className=""
                    color="#F5F5F5"
                    text="회원탈퇴"
                    onClick={handleConfirmWithdrawModal}
                />
                {isLogoutModalOpen && (
                    <ConfirmModal>
                        <ConfirmContent
                            message={
                                <>
                                    <SpanText isred={"false"}>
                                        로그아웃 하시겠습니까?
                                    </SpanText>
                                </>
                            }
                            onConfirm={handleConfirmLogout}
                            onCancel={handleCloseModal}
                        />
                    </ConfirmModal>
                )}
                {isWithdrawModalOpen && (
                    <ConfirmModal>
                        <ConfirmContent
                            message={
                                <>
                                    <SpanText isred={"false"}>
                                        {userInfo.nickname}님의 펫이 기다리고
                                        있어요!
                                    </SpanText>
                                    <SpanText isred={"true"}>
                                        회원 탈퇴시 해당 계정으로
                                    </SpanText>
                                    <SpanText isred={"true"}>
                                        영원히 서비스를 이용할 수 없어요 😥
                                    </SpanText>
                                    <SpanText isred={"false"}>
                                        그래도 탈퇴하시겠어요?
                                    </SpanText>
                                </>
                            }
                            onConfirm={handleConfirmWithdraw}
                            onCancel={handleCloseModal}
                        />
                    </ConfirmModal>
                )}
            </ButtonWrapper>
        </MyPageWrapper>
    );
}

interface classtype {
    className: string;
    onClick(): void;
    color: string;
    text: string;
}

export function MyButton({ className, onClick, color, text }: classtype) {
    return (
        <button
            className={className}
            onClick={onClick}
            style={{ backgroundColor: color }}
        >
            {text}
        </button>
    );
}
