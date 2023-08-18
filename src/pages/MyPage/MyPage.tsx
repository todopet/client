import { MyPageWrapper, ActivityWrapper, ButtonWrapper, MypageButton, AlertText, Text, ModalButtonArea, NewButton } from "./MyPage.styles";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";
import { Modal, ModalBackdrop } from "@/components/pages/MyPage/UserInfo/UserInfo.styles";
import { useState } from 'react';

export default function MyPage() {
    const [state, setState] = useState(false);
    const clickHandler = () => {
        setState(!state);
    }
    return (
        <MyPageWrapper>
            <UserInfo name="테이머킴" date="2023.08.17"></UserInfo>
            <ActivityWrapper>
                <Activity activityType="heart" data="78"></Activity>
                <Activity activityType="calendar" data="17"></Activity>
                <Activity activityType="check" data="32"></Activity>
            </ActivityWrapper>
            <ButtonWrapper>
                <MypageButton color="#F5F5F5" text="로그아웃" onClick={""} />
                <MypageButton color="#F5F5F5" text="회원탈퇴" onClick={clickHandler} />
                { 
                    state && 
                    <ModalBackdrop>
                        <Modal>
                            <AlertText>
                                <Text>테이머킴님의 펫이 기다리고 있어요!</Text>
                                <Text>테이머킴님의 펫을 두고 떠나시려구요?</Text>
                            </AlertText>
                            <ModalButtonArea>
                                <NewButton color="#E7E8EA" text="아니오" onClick={clickHandler} />
                                <NewButton color="#E7E8EA" text="예" onClick={clickHandler} />
                            </ModalButtonArea>
                        </Modal>
                    </ModalBackdrop>
                }
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
    return <button className={className} onClick={onClick} color={color}>{text}</button>
}