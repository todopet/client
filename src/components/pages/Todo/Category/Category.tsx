import { ReactComponent as PlusSvg } from "@/assets/images/plusButton.svg";
import { CategoryStyles, Text, PlusButton } from './Category.styles';

export default function Category() {
    return (
        <div>
            <CategoryStyles>
                <Text>목표1</Text>
                <PlusButton>
                    <PlusSvg />
                </PlusButton>
            </CategoryStyles>
        </div>
    );
}
