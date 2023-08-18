import styled from "styled-components";

const CategoryStyles = styled.div`
    background-color: #F2F2F2;
    width: fit-content;
    height: 32px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 12px;
`;

const Text = styled.span`
    font-size: 14px;
    font-weight: 600;
    font-family: Pretendard;
`;

const PlusButton = styled.button`
    border-radius: 15px;
    border: none;
    background-color: white;
    width: 20px;
    height: 20px;
    padding: 4px 0px;
    margin-left: 16px;
    margin-right: 6px;
`;

export { CategoryStyles, Text, PlusButton };
