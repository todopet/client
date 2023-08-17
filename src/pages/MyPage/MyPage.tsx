import { MyPageWrapper, ActivityWrapper, ButtonWrapper, MypageButton } from "./MyPage.styles";
import { UserInfo } from "@/components/pages/MyPage/UserInfo/UserInfo";
import Activity from "@/components/pages/MyPage/Activity/Activity";

export default function MyPage() {
    return (
        <MyPageWrapper>
            <UserInfo name="테이머킴" date="2023.08.17"></UserInfo>
            <ActivityWrapper>
                <Activity activityType="heart" data="78"></Activity>
                <Activity activityType="calendar" data="17"></Activity>
                <Activity activityType="check" data="32"></Activity>
            </ActivityWrapper>
            <ButtonWrapper>
                <MypageButton color="#F5F5F5">로그아웃</MypageButton>
                <MypageButton color="#F5F5F5">회원탈퇴</MypageButton>
            </ButtonWrapper>
        </MyPageWrapper>
    );
}
