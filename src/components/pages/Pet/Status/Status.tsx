import { BarName, StatusArea, ExpTotalBar, ExpCurrentBar } from './Status.styles';

interface StatusProps {
    name: string;
    color: string;
    totalcount?: number;
    currentcount?: number;
}

export default function Status({ name, color, totalcount, currentcount }: StatusProps) {
    if (totalcount === undefined || currentcount === undefined) {
        return null; // totalcount 또는 currentCount가 정의되지 않았을 경우에 대한 처리
    }
    return (
        <StatusArea>
            <BarName>{name}</BarName>
            <ExpTotalBar>
                <ExpCurrentBar totalcount={totalcount} currentcount={currentcount} color={color} />
            </ExpTotalBar>
        </StatusArea>
    );
}