import { BarName, StatusArea, ExpTotalBar, ExpCurrentBar } from './Status.styles';

interface StatusProps {
    name: string;
    color: string;
    totalCount?: number;
    currentCount?: number;
}

export const Status = ({
  name, color, totalCount, currentCount
}: StatusProps) => {
    if (totalCount === undefined || currentCount === undefined) {
        return null; // totalCount 또는 currentCount가 정의되지 않았을 경우에 대한 처리
    }
    return (
        <StatusArea>
            <BarName>{name}</BarName>
            <ExpTotalBar>
                <ExpCurrentBar totalCount={totalCount} currentCount={currentCount} color={color} />
            </ExpTotalBar>
        </StatusArea>
    );
}