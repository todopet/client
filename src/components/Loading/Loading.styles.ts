import styled from "styled-components";

const LoadingWrap = styled.div`
    display: flex;
    justify-content: center;
    align-item: center;
    position: relative;
    width: 100%;
    height: 100%;
    & > img {
        width: 280px;
        height: 280px;
        position: absolute;
        top: 35%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export { LoadingWrap };
