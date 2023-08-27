import { MyPageWrapper, ContentWrapper, ActivityWrapper, ButtonWrapper, MypageButton, AlertText, Text, ModalButtonArea, NewButton } from "./MyPage.styles";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";
import { Modal, ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import { useState } from 'react';

export default function MyPage() {
    const [state, setState] = useState(false);
    const handleClick = () => {
        setState(!state);
    }
    const handleLogin = () => {}
    return (
        <MyPageWrapper>
            <ContentWrapper>
                <UserInfo name="테이머킴" date="2023.08.17"></UserInfo>
                <ActivityWrapper>
                    <Activity activityType="heart" data="78"></Activity>
                    <Activity activityType="calendar" data="17"></Activity>
                    <Activity activityType="check" data="32"></Activity>
                </ActivityWrapper>
                <ButtonWrapper>
                    <MypageButton className="" color="#F5F5F5" text="로그아웃" onClick={handleLogin} />
                    <MypageButton className="" color="#F5F5F5" text="회원탈퇴" onClick={handleClick} />
                    { 
                        state && 
                        <ModalBackdrop>
                            <Modal>
                                <AlertText>
                                    <Text>테이머킴님의 펫이 기다리고 있어요!</Text>
                                    <Text>테이머킴님의 펫을 두고 떠나시려구요?</Text>
                                </AlertText>
                                <ModalButtonArea>
                                    <NewButton className="" color="#E7E8EA" text="아니오" onClick={handleClick} />
                                    <NewButton className="" color="#E7E8EA" text="예" onClick={handleClick} />
                                </ModalButtonArea>
                            </Modal>
                        </ModalBackdrop>
                    }
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
    return <button className={className} onClick={onClick} color={color}>{text}</button>
}