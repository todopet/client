import styled from "styled-components";

const ItemCount = styled.div`
    display: flex;
    justify-content: center;
    align-items: baseline;
    width: 46px;
    height: 24px;
    border-radius: 25px;
    background-color: #d9d9d9;
    opacity: 0.9;
    font-size: 20px;
    color: #545353;

    & > span:nth-child(1) {
        font-size: 16px;
        margin-right: 1px;
    }
    & > span:nth-child(2) {
        font-weight: 600;
    }
`;

export { ItemCount };
