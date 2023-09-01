import { BarName, StatusArea, ExpTotalBar, ExpCurrentBar } from './Status.styles';

interface StatusProps {
    name: string;
    color: string;
    totalCount?: number;
    currentCount?: number;
}

export default function Status({ name, color, totalCount, currentCount }: StatusProps) {
    if (totalCount === undefined || currentCount === undefined) {
        return null; // totalCount 또는 currentCount가 정의되지 않았을 경우에 대한 처리(totalCount와 currentCount가 optional하기 때문에 undefined 타입일 경우도 고려해줘야 하는듯)
    }
    return (
        <StatusArea>
            <BarName>{name}</BarName>
            <ExpTotalBar>
                <ExpCurrentBar totalCount={totalCount} currentCount={currentCount} color={color}></ExpCurrentBar>
            </ExpTotalBar>
        </StatusArea>
    );
}