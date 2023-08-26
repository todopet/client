import {
    MyPageWrapper,
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

import { useEffect, useState } from "react";

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
    const clickHandler = () => {
        console.log("");
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

    return (
        <MyPageWrapper>
            <UserInfo name={userInfo.nickname} date="2023.08.17"></UserInfo>
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
                <MypageButton color="#F5F5F5" text="로그아웃" onClick={""} />
                <MypageButton
                    color="#F5F5F5"
                    text="회원탈퇴"
                    onClick={clickHandler}
                />
                {false && (
                    <ModalBackdrop>
                        <Modal>
                            <AlertText>
                                <Text>테이머킴님의 펫이 기다리고 있어요!</Text>
                                <Text>
                                    테이머킴님의 펫을 두고 떠나시려구요?
                                </Text>
                            </AlertText>
                            <ModalButtonArea>
                                <NewButton
                                    color="#E7E8EA"
                                    text="아니오"
                                    onClick={clickHandler}
                                />
                                <NewButton
                                    color="#E7E8EA"
                                    text="예"
                                    onClick={clickHandler}
                                />
                            </ModalButtonArea>
                        </Modal>
                    </ModalBackdrop>
                )}
            </ButtonWrapper>
        </MyPageWrapper>
    );
}

// interface classtype {
//     className: string;
//     onClick: () => void;
// }

//@ts-ignore
export function MyButton({ className, onClick, color, text }: classtype) {
    return (
        <button className={className} onClick={onClick} color={color}>
            {text}
        </button>
    );
}
