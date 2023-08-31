import styled from 'styled-components';
import { TotalBar, CurrentBar } from '../Achievement/Achievement.styles';

const StatusArea = styled.div`
height: 40px;
display: flex;
gap: .4rem;
align-items: center;
`

const BarName = styled.p`
    margin: 8px 10px 8px 10px;
    font-size: .95rem;
    font-weight: bold;
    color: black;
    flex-basis: 40%
    height: 40px;
    line-height: 40px;
`

const ExpTotalBar = styled(TotalBar)`
    width: 60%;
    height: 25px;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
`

const ExpCurrentBar = styled(CurrentBar)`
    border-radius: 20px 0 0 20px;
`


export { BarName, StatusArea, ExpTotalBar, ExpCurrentBar };