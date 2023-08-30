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
        // 현재 페이지가 localhost:3001 이 출처라서 구글에 잘 넘어감.
        // 백ㅇ네드에서 리다이렉트
        document.location.href = "http://34.64.42.28/api/v1/login";
        // document.location.href = "http://localhost:3001/api/v1/login";
        // 구글 로그인 페이지 뜨고
        // 다 되고 나면
        // 다시 리액트 페이지로 돌아가야함
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
                    구글 아이디로 로그인
                </LoginContent>
            </LoginBtnGroup>
        </Container>
    );
};

export default Login;
