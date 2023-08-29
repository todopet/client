import styled, {
    createGlobalStyle,
    StyleSheetManager
} from "styled-components";

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

interface LayoutProps {
    withheader: string;
    withfooter: string;
}
const LayoutWrapper = styled.div<LayoutProps>`
    overflow-y: scroll;
    margin-top: ${(props) => (props.withheader === "true" ? "60px" : "0px")};
    height: ${(props) =>
        props.withheader === "true" && props.withfooter === "true"
            ? "calc(100vh - 130px)"
            : "100vh"};
    margin-bottom: ${(props) => (props.withfooter === "true" ? "70px" : "0px")};
`;

export { GlobalStyle, LayoutWrapper };
