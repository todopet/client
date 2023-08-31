import { ExpTotalBar, ExpCurrentBar } from './Exp.styles';

interface expType {
    totalcount?: number;
    currentcount?: number;
}

export default function Exp({ totalcount, currentcount }: expType) {
    if (totalcount === undefined || currentcount === undefined) {
        return null; // totalCount 또는 currentCount가 정의되지 않았을 경우에 대한 처리(totalCount와 currentCount가 optional하기 때문에 undefined 타입일 경우도 고려해줘야 하는듯)
    }
    return (
        <ExpTotalBar>
            <ExpCurrentBar totalcount={totalcount} currentcount={currentcount} color={"#1AAB17"}></ExpCurrentBar>
        </ExpTotalBar>
    );
}