import { DiscardIcon } from "@/modules/icons";
import { Button } from "@/components/Button";

interface parameterType {
    onClick(e: any): void;
}

export const ThrowBtn = ({ onClick }: parameterType) => {
    return (
        <Button className="p-0" onClick={onClick}>
            <img src={DiscardIcon} alt="discard" />
        </Button>
    );
}