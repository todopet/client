import styled from 'styled-components';
import { TotalBar, CurrentBar } from '../Achievement/Achievement.styles';

const ExpTotalBar = styled(TotalBar)`
    width: 100%;
    height: 10px;
    background-color: #E3E3E3;
    border-radius: 0;
`

const ExpCurrentBar = styled(CurrentBar)`
    border-radius: 0;
`

export { ExpTotalBar, ExpCurrentBar };