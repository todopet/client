import Spinner from "@/assets/images/spinner.gif";

import {
    Container,
    Main,
    TitleGroup,
    Title,
    Content,
    LoginBtnGroup,
    GoogleImage,
    LoginContent,
    Img
} from "@/pages/Login/Login.styles";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Login = () => {
    const handleLoginClick = async () => {
        // 백엔드에서 리다이렉트
        // TODO: 발표 전 수정
        document.location.href = "https://todopet.vercel.app/api/v1/login";
        // document.location.href = "http://localhost:3001/api/v1/login";
    };
    const location = useLocation();
    useEffect(() => {
        const hash = location.hash.split("#")[1];
        if (hash) {
            const uri = decodeURIComponent(hash);
            const queries = uri.split("&");
            const queryParams = queries.map((el) => el.split("="));
            const reason = queryParams[2][1];
            alert(reason);
        }
    }, [location.hash]);

    return (
        <Container>
            <Main>
                <TitleGroup>
                    <Title>Todo Pet</Title>
                    <Img src={Spinner} alt="Login"></Img>

                    <Content>할 일을 완료하며, 펫과 함께 성장하세요.</Content>
                </TitleGroup>
            </Main>
            <LoginBtnGroup>
                <GoogleImage></GoogleImage>
                <LoginContent onClick={handleLoginClick}>
                    구글 계정으로 로그인
                </LoginContent>
            </LoginBtnGroup>
        </Container>
    );
};

export default Login;
