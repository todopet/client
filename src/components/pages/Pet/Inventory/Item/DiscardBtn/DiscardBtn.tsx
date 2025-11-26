import { DiscardIcon } from "@/modules/icons";
import Button from "@/components/Button/Button";

interface parameterType {
    onClick(e: any): void;
}

export default function ThrowBtn({ onClick }: parameterType) {
    return (
        <Button className="p-0" onClick={onClick}>
            <img src={DiscardIcon} alt="discard" />
        </Button>
    );
}
