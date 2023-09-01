import styled from 'styled-components';
import { TotalBar, CurrentBar } from '../Achievement/Achievement.styles';

const StatusArea = styled.div`
    height: 25%;
    display: flex;
    gap: .4rem;
    align-items: center;
    justify-content: center;
`

const BarName = styled.p`
    margin: 8px 10px 8px 10px;
    font-size: 100%;
    font-weight: bold;
    color: black;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 3% 2% 2%;
`

const ExpTotalBar = styled(TotalBar)`
    width: 60%;
    height: 65%;
    background-color: white;
    border-radius: 20px;
    overflow: hidden;
`

const ExpCurrentBar = styled(CurrentBar)`
    border-radius: 20px 0 0 20px;
`


export { BarName, StatusArea, ExpTotalBar, ExpCurrentBar };