import { PlusButtonIcon } from "@/modules/icons";
import { CategoryStyles, Text, PlusButton } from "./Category.styles";

interface CategoryProps {
  category: string;
  handleClick: () => void;
  isEnded: boolean;
}
export default function Category({ category, handleClick, isEnded }: CategoryProps) {
  return (
    <CategoryStyles onClick={handleClick} $isEnded={isEnded}>
      <Text>{category}</Text>
      {!isEnded && (
        <PlusButton>
          <img src={PlusButtonIcon} alt="add" />
        </PlusButton>
      )}
    </CategoryStyles>
  );
}
