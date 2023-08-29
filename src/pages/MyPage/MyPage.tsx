import {
    MyPageWrapper,
    ContentWrapper,
    ActivityWrapper,
    ButtonWrapper,
    MypageButton,
    AlertText,
    Text,
    ModalButtonArea,
    NewButton
} from "./MyPage.styles";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";
import {
    Modal,
    ModalBackdrop
} from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import { res, myUser } from "@/@types/index";
import axiosRequest from "@/api";
import { setKoreaTime } from "@/libs/utils/global";

import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

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

    const [showModal, setShowModal] = useState(false);

    const handleClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleLogin = () => {};

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

    const handleWithdraw = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:3001/api/v1/withdraw`
            );
            alert("탈퇴 처리되었습니다. ");
            navigate("/");
        } catch (error) {
            console.error("Error withdrawing user:", error);
            alert("회원 탈퇴 처리 실패");
        }
    };

    return (
        <MyPageWrapper>
            <ContentWrapper>
                <UserInfo
                    id={userInfo._id}
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
                        onClick={handleLogin}
                    />
                    <MypageButton
                        className=""
                        color="#F5F5F5"
                        text="회원탈퇴"
                        onClick={handleClick}
                    />
                    {showModal && (
                        <ModalBackdrop>
                            <Modal>
                                <AlertText>
                                    <Text>
                                        {`${userInfo.nickname}님의 펫이 기다리고 있어요!`}
                                    </Text>
                                    <Text>
                                        {`${userInfo.nickname}님의 펫을 두고 떠나시려구요?🥺`}
                                    </Text>
                                </AlertText>
                                <ModalButtonArea>
                                    <NewButton
                                        className=""
                                        color="#E7E8EA"
                                        text="아니오"
                                        onClick={handleCloseModal}
                                    />
                                    <NewButton
                                        className=""
                                        color="#E7E8EA"
                                        text="예"
                                        onClick={handleWithdraw}
                                    />
                                </ModalButtonArea>
                            </Modal>
                        </ModalBackdrop>
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
