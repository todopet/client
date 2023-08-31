import styled from "styled-components";

const DividerWrap = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-basis: 3%;

    & > div {
        font-size: 12px;
        color: #b1aeae;
    }
`;

interface LineHasLengthProps {
    haslength: string;
}
const Line = styled.div<LineHasLengthProps>`
    width: ${(props) => (props.haslength === "true" ? "45%" : "50%")};
    height: 1px;
    background-color: #dfdfdf;
`;

export { DividerWrap, Line };
