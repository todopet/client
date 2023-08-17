import styled from 'styled-components';
import heart from '@/assets/images/heart.svg';
import calendar from '@/assets/images/calendar.svg';
import check from '@/assets/images/check.svg';

const ActivityCard = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: .7rem;
    background-color: ${props => props.color};
    width: 100%;
    height: 90px;
    border-radius: 15px;
`

// 마이페이지에 들어오면 유저 정보를 받는데 거기에 펫과 함께한지 며칠 됐는지(heart), 며칠동안 todo 달성했는지(calendar), 총 몇개의 todo를 달성했는지(check)의 정보를 받아서 그걸 Icon 컴포넌트에 props로 지정해줘야함.
// 이름은 각각 heart, calendar, check 라고 했다고 가정
const Icon = styled.div<{ activityType: string }>`
    background-image: url(${props => { return props.activityType === "heart" ? heart : props.activityType === "calendar" ? calendar : check}});
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: 23px;
    height: 23px;
    margin: 0 0 0 30px;
`

const Description = styled.div`
    color: black;
    font-size: 17px;
    margin-bottom: 2px;
`

export { ActivityCard, Icon, Description };