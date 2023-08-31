import {
    MyPageWrapper,
    ContentWrapper,
    ActivityWrapper,
    ButtonWrapper,
    MypageButton
} from "./MyPage.styles";
import ConfirmModal from "@/components/ConfirmModal/ConfirmModal";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";
import { res, myUser } from "@/@types/index";
import axiosRequest from "@/api";
import { setKoreaTime } from "@/libs/utils/global";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

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
            >("get", "/users", {});
            setUserInfo(response.data);
        } catch (error) {
            console.error("Error fetching userInfo data: ", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const navigate = useNavigate();

    return (
        <MyPageWrapper>
            <ContentWrapper>
                <UserInfo
                    picture={userInfo.picture}
                    name={userInfo.nickname}
                    date={setKoreaTime(userInfo.createdAt)}
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
                        <ConfirmModal
                            message={"로그아웃 하시겠습니까?"}
                            onConfirm={handleConfirmLogout}
                            onCancel={handleCloseModal}
                        ></ConfirmModal>
                    )}
                    {isWithdrawModalOpen && (
                        <ConfirmModal
                            message={`${userInfo.nickname}님의 펫이 기다리고 있어요!\n${userInfo.nickname}님의 펫을 두고 떠나시려구요?🥺`}
                            onConfirm={handleConfirmWithdraw}
                            onCancel={handleCloseModal}
                        ></ConfirmModal>
                    )}
                </ButtonWrapper>
            </ContentWrapper>
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
