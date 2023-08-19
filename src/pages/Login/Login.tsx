import {
    Container,
    Main,
    MainImage,
    TitleGroup,
    Title,
    Content,
    LoginBtnGroup,
    GoogleImage,
    LoginContent
} from "@/pages/Login/Login.styles";

export default function Login() {
    return (
        <Container>
            <Main>
                <MainImage></MainImage>
                <TitleGroup>
                    <Title>todo pet</Title>
                    <Content>할 일을 완료하며, 펫과 함께 성장하세요.</Content>
                </TitleGroup>
            </Main>
            <LoginBtnGroup>
                <GoogleImage></GoogleImage>
                <LoginContent>구글 아이디로 로그인</LoginContent>
            </LoginBtnGroup>
        </Container>
    );
}
