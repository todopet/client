import { PlusButtonIcon } from "@/modules/icons";
import { CategoryStyles, Text, PlusButton } from "@/components/pages/Todo/TodoList/TodoItem/Category/Category.styles";

interface CategoryProps {
  category: string;
  handleClick: () => void;
  isEnded: boolean;
}
export const Category = ({ category, handleClick, isEnded }: CategoryProps) => {
  return (
    <CategoryStyles onClick={handleClick} $isEnded={isEnded}>
      <Text>{category}</Text>
      {!isEnded && (
        <PlusButton className="flex justify-center">
          <img src={PlusButtonIcon} alt="add" />
        </PlusButton>
      )}
    </CategoryStyles>
  );
}