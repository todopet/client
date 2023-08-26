import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrap = styled.div`
    width: 100%;
    padding: 10px;
    margin-top: 45px;
`;

const Text = styled.div`
    font-size: 14px;
    color: #adadad;
    margin-left: 20px;
    font-weight: 500;
`;

const ButtonWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 18px;
    margin-top: 15px;
`;

const CircleButton = styled.button`
    width: 4.8125rem;
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: #f5f5f5;
    border: none;
    margin: 10px 0;

    &:last-child {
        margin-bottom: 30px;
    }
`;
const ActionButtonWrap = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const ActionButton = styled.button`
    width: 10.1875rem;
    height: 2.375rem;
    flex-shrink: 0;
    border: none;
    border-radius: 0.5rem;
    background: #f5f5f5;
`;

const StyledLink = styled(Link)`
    font-weight: 500;
    text-decoration: none;
    color: inherit;
`;

export {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton,
    Wrap,
    StyledLink
};
