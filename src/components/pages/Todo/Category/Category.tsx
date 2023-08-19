import { ReactComponent as PlusSvg } from "@/assets/images/plusButton.svg";
import { CategoryStyles, Text, PlusButton } from "./Category.styles";

interface CategoryProps {
    category: string;
}
export default function Category({ category }: CategoryProps) {
    return (
        <CategoryStyles>
            <Text>{category}</Text>
            <PlusButton>
                <PlusSvg />
            </PlusButton>
        </CategoryStyles>
    );
}
