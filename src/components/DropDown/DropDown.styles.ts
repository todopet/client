import styled, { css } from "styled-components";
interface DropDownProps {
    $isDropped: boolean;
}

const Wrapper = styled.div`
    margin: 100px auto;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: white;
    font-size: 19px;
    background: gray;
    width: 400px;
    height: 50px;
    font-weight: bold;
`;

const DropdownContainer = styled.div`
    position: relative;
    text-align: center;
`;

const DropdownButton = styled.div`
    cursor: pointer;
`;

const Menu = styled.div.attrs<DropDownProps>((props) => {
    return {
        $isDropped: props.$isDropped
    };
})`
    background: gray;
    position: absolute;
    top: 30px;
    left: 50%;
    width: 100px;
    text-align: center;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    opacity: 0;
    visibility: hidden;
    transform: translate(-50%, -20px);
    transition:
        opacity 0.4s ease,
        transform 0.4s ease,
        visibility 0.4s;
    z-index: 9;

    ${({ $isDropped }) =>
        $isDropped &&
        css`
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, 0);
            left: 50%;
        `};
`;

const Ul = styled.ul`
    & > li {
        margin-bottom: 10px;
    }

    & > li:first-of-type {
        margin-top: 10px;
    }

    list-style-type: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

const Li = styled.li``;

export { Wrapper, DropdownContainer, DropdownButton, Menu, Ul, Li };
