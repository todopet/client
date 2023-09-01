import styled from "styled-components";

const TodoContainer = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;

    & > div:nth-child(1) {
        position: fixed;
    }
`;
const MainContent = styled.div`
    margin-top: 80px;
`;

export { TodoContainer, MainContent };
