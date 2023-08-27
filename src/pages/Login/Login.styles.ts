import styled from "styled-components";
import mainImage from "@/assets/images/main.svg";
import googleIcon from "@/assets/icons/google.svg";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: 100vh;
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
    width: 20rem;
    height: 3.6875rem;
    border-color: #8d8d8d;
    background-color: #ffffff;
    flex-shrink: 0;
    border-radius: 5rem;
    align-items: center;
    justify-content: center;
`;

const GoogleImage = styled.div`
    background: url(${googleIcon});
    width: 45px;
    height: 45px;
    background-repeat: no-repeat;
`;

const LoginContent = styled.div`
    display: flex;
    width: 15rem;
    font-size: 1rem;
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
