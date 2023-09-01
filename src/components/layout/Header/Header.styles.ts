import styled from "styled-components";

export const HeaderContainer = styled.header`
    width: 390px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0px;
    background-color: #ffff;

    box-sizing: border-box;
    height: 60px;
    position: fixed;
    top: 0;
    z-index: 10;
`;
export const LogoContainer = styled.div`
    // margin-right: auto;
    a {
        text-decoration: none;
    }
`;

export const ButtonCatainer = styled.div`
    margin-right: 16px;

    & > div > div > div:nth-child(2) {
        width: 140px;
    }
`;
