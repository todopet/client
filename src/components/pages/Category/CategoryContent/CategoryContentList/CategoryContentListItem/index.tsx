import { Category } from "@/@types";
import {
    CircleButton,
    StyledLink,
    ItemWrap,
    CategorySpan
} from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentList.styles";

import { UpdateIcon } from "@/modules/icons";

interface CategoryProps {
    category: Category;
}

const CategoryContentListItem: React.FC<CategoryProps> = ({ category }) => {
    return (
        <>
            {
                <ItemWrap>
                    <CircleButton key={category._id}>
                        <CategorySpan>{category.category}</CategorySpan>
                    </CircleButton>
                    <StyledLink to={`/category/post?categoryId=${category._id}`}>
                        <img src={UpdateIcon} alt="update" />
                    </StyledLink>
                </ItemWrap>
            }
        </>
    );
};

export default CategoryContentListItem;
