import { ReactComponent as PlusSvg } from "@/assets/images/plusButton.svg";
import { CategoryStyles, Text, PlusButton } from './Category.styles';

export default function Category() {
    return (
            <CategoryStyles>
                <Text>카테고리</Text>
                <PlusButton>
                    <PlusSvg />
                </PlusButton>
            </CategoryStyles>
    );
}
