import styled from "styled-components";

interface CategoryStylesProps {
    $isEnded: boolean;
}
const CategoryStyles = styled.div<CategoryStylesProps>`
    background-color: #f2f2f2;
    width: fit-content;
    height: 32px;
    border-radius: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: ${(props) => (props.$isEnded ? "14px" : "10px")};
    padding-left: 14px;
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
    margin-left: 10px;
    cursor: pointer;
`;

export { CategoryStyles, Text, PlusButton };
