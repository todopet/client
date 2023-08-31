import styled from "styled-components";
import mainImage from "@/assets/images/main.svg";
import googleIcon from "@/assets/icons/google.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: inherit;
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: inherit;
    height: 70vh;
`;

const MainImage = styled.div`
    background: url(${mainImage});
    width: 250px;
    height: 200px;
    background-repeat: no-repeat;
    margin-bottom: -100px;
`;

const TitleGroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.div`
    font-size: 2.75rem;
    font-style: normal;
    font-weight: 800;
    margin-bottom: 10px;
`;

const Content = styled.div`
    color: #8d8d8d;
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 500;
`;

const LoginBtnGroup = styled.button`
    display: flex;
    width: 21.75rem;
    height: 3.6875rem;
    flex-shrink: 0;
    border-radius: 0.5rem;
    border: 0.0625rem solid #c9c9c9;
    margin-bottom: 2.7rem;
    background: #fff;
    align-items: center;
    justify-content: center;
`;

const GoogleImage = styled.div`
    background: url(${googleIcon});
    width: 45px;
    height: 45px;
    margin-top: 12px;
    margin-left: -10px;
    background-repeat: no-repeat;
`;

const LoginContent = styled.div`
    display: flex;
    width: 15rem;
    font-size: 1.125rem;
    font-family: Pretendard;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: 0.03375rem;
    color: #5e5e5e;
    text-align: center;
    align-items: center;
    justify-content: center;
`;

export {
    Container,
    Main,
    MainImage,
    LoginBtnGroup,
    GoogleImage,
    LoginContent,
    TitleGroup,
    Title,
    Content
};
