import { BaseBar, BarName, StatusArea } from './Status.styles';

interface StatusProps {
    name: string;
    color: string;
}

export default function Status({ name, color }: StatusProps) {
    return (
        <StatusArea>
            <BarName>{name}</BarName>
            <BaseBar color={color}>
                <div className="fulfilledBar"></div>
            </BaseBar>
        </StatusArea>
    );
}