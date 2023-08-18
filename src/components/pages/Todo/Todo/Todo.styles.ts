import { styled } from 'styled-components';

const TodoStyles = styled.div`
    height: 20px;
    margin: 20px 2px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const Checkbox = styled.input`
    width: 22px;
    height: 22px;
    margin-right: 8px;
    border: none;
    background-color: #E7E8EA;
`;

const Text = styled.span`
    font-family: Pretendard;
    font-size: 16px;
`;

export { TodoStyles, Checkbox, Text };
