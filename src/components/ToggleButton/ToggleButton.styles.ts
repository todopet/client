import styled from "styled-components";

type ToggleWrapperProps = {
    active: boolean;
};

export const ToggleWrapper = styled.div<ToggleWrapperProps>`
    width: 44px;
    height: 22px;
    flex-shrink: 0;
    border-radius: 15px;
    background: #cbcaca;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: background 0.3s;
    justify-content: ${(props) => (props.active ? "flex-end" : "flex-start")};
`;

export const Switch = styled.div`
    width: 17px;
    height: 17px;
    flex-shrink: 0;
    color: #000;
    font-family: Pretendard;
    font-size: 13px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    text-align: center;
    background: white;
    border-radius: 50%;
    margin: 0 4px;
`;
