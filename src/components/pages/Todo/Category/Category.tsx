import { ReactComponent as PlusSvg } from "@/assets/images/plusButton.svg";
import { CategoryStyles, Text, PlusButton } from "./Category.styles";

interface CategoryProps {
    category: string;
    handleClick: () => void;
}
export default function Category({ category, handleClick }: CategoryProps) {
    return (
        <CategoryStyles onClick={handleClick}>
            <Text>{category}</Text>
            <PlusButton>
                <PlusSvg />
            </PlusButton>
        </CategoryStyles>
    );
}
