import { category } from "@/@types";
import {
    CircleButton,
    StyledLink
} from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentList.styles";

interface CategoryProps {
    category: category;
}

const CategoryContentListItem: React.FC<CategoryProps> = ({ category }) => {
    return (
        <>
            {(
                <CircleButton key={category._id}>
                    <StyledLink
                        to={`/category/post?categoryId=${category._id}`}
                    >
                        {category.category}
                    </StyledLink>
                </CircleButton>
            )}
        </>
    );
};

export default CategoryContentListItem;
