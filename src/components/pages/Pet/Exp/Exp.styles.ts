import styled from 'styled-components';

const BaseBar = styled.div`
    width: 100%;
    height: 10px;
    background-color: #E3E3E3;

    & > .fulfilledBar {
        width: 40%;
        height: 100%;
        background-color: #1AAB17;
    }
`

export default BaseBar;