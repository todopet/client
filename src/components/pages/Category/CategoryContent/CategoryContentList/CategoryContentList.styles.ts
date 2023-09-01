import styled from "styled-components";
import { Link } from "react-router-dom";

const Wrap = styled.div`
    width: 100%;
    padding: 10px 25px 10px 5px;
    margin-top: -5px;
    box-sizing: border-box;
`;

const Text = styled.div`
    font-size: 14px;
    color: #adadad;
    margin-top: 20px;
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
    /* width: 4.8125rem; */
    height: 2rem;
    flex-shrink: 0;
    border-radius: 1rem;
    background: #f5f5f5;
    border: none;
    margin: 10px 0;
    padding: 0 18px;
    /* margin-right: 230px; */

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
    margin-left: auto;
    font-weight: 500;
    text-decoration: none;
    color: inherit;
`;

const ItemWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    > a {
        margin: 0;
    }
`;

export {
    Text,
    CircleButton,
    ButtonWrap,
    ActionButtonWrap,
    ActionButton,
    Wrap,
    StyledLink,
    ItemWrap
};
