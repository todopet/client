import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        font-family: Arial, sans-serif;
        height: 100vh;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center; /* 가로 중앙 정렬 */
        align-items: center; /* 세로 중앙 정렬 */
        margin: 0 auto;

        & > div {
            width: 390px;
            min-width: 375px;
            height: 100vh;
        }
    }
`;

const LayoutWrapper = styled.div`
    overflow-y: scroll;
    margin-top: 60px;
    height: calc(100vh - 130px);
    margin-bottom: 70px;
`;

export { GlobalStyle, LayoutWrapper };
