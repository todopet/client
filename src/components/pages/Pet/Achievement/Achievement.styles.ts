import styled from 'styled-components';
import gift from "@/assets/images/gift.svg";
import gift_bang from "@/assets/images/gift_bang.svg";
import empty_gift from "@/assets/images/empty_gift.svg";
import { ModalBackdrop } from '../../MyPage/UserInfo/UserInfo.styles';

const AchBox = styled.div<{ achDone: boolean }>`
	width: 80%;
	height: 70px;
	border: 1px solid ${props => props.achDone === true ? "#3FB33D" : "#B7B7B7"};
    border-radius: 10px;
    display: flex;
    gap: .5rem;
    align-items: center;
    position: relative;
`

const AchStatus = styled.div<{ achDone: boolean }>`
    width: 10px;
    height: 100%;
    background-color: ${props => props.achDone === true ? "#9EFFAE" : "#B7B7B7"};
    border-radius: 10px 0 0 10px;
`

const AchInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: .1rem;
    flex-basis: 70%;
    padding-left: 10px;
`

const AchName = styled.p`
    font-weight: bold;
    font-size: 15px;
    margin: 0 0 5px 0;
`

const TotalBar = styled.div`
    width: 95%;
    height: 12px;
    border-radius: 6px;
    background-color: #A0A0A0;
    position: relative;

    p {
        margin: 0;
        position: absolute;
        top: 0; left: 48%;
        font-size: 11px;
    }
`

const CurrentBar = styled.div<{ totalCount: number; currentCount: number }>`
    width: ${props => Math.round((props.currentCount / props.totalCount) * 100)}%;
    height: 100%;
    background-color: ${props => props.color};
    border-radius: 6px;
`

const AchIcon = styled.div<{ achDone: boolean; isRewarded: boolean }>`
    background-image: url(${props => props.achDone === true ? props.isRewarded === true ? empty_gift : gift_bang : gift});
    background-repeat: no-repeat;
    width: 50px;
    height: ${props => props.achDone === true ? props.isRewarded === true ? "40" : "55" : "55"}px;
`

const AchModalBackdrop = styled(ModalBackdrop)`
    border-radius: 9px;
    background-color: rgba(0, 0, 0, 0.3);
`

export { AchBox, AchStatus, AchInfo, AchName, TotalBar, CurrentBar, AchIcon, AchModalBackdrop };