import React from 'react';
import styled from 'styled-components';

const BaseBar = styled.div`
    flex-basis: 60%;
    height: 25px;
    background-color: white;
    border-radius: 10px;

    & > .fulfilledBar {
        width: 30%;
        height: 100%;
        background-color: ${props => props.color};
        border-radius: 10px;
    }
`

const BarName = styled.p`
    margin: 8px 10px 8px 10px;
    font-size: 15px;
    font-weight: bold;
    color: black;
    flex-basis: 40%
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
`

const StatusArea = styled.div`
    height: 40px;
    display: flex;
    gap: .4rem;
    align-items: center;
`

export { BaseBar, BarName, StatusArea };