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

const Login = () => {
    const handleLoginClick = async () => {
        // 백엔드에서 리다이렉트
        // TODO: 발표 전 수정
        // document.location.href = "https://kdt-sw-5-2-team14.elicecoding.com/api/v1/login";
        document.location.href = "http://localhost:3001/api/v1/login";
    };
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
                <LoginContent onClick={handleLoginClick}>
                    Google 계정으로 로그인
                </LoginContent>
            </LoginBtnGroup>
        </Container>
    );
};

export default Login;
