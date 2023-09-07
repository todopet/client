import { category } from "@/@types";
import {
    CircleButton,
    StyledLink,
    ItemWrap,
    CategorySpan
} from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentList.styles";

import { ReactComponent as UpdateIcon } from "@/assets/icons/update.svg";

interface CategoryProps {
    category: category;
}

const CategoryContentListItem: React.FC<CategoryProps> = ({ category }) => {
    return (
        <>
            {
                <ItemWrap>
                    <CircleButton key={category._id}>
                        <CategorySpan>{category.category}</CategorySpan>
                    </CircleButton>
                    <StyledLink
                        to={`/category/post?categoryId=${category._id}`}
                    >
                        <UpdateIcon />
                    </StyledLink>
                </ItemWrap>
            }
        </>
    );
};

export default CategoryContentListItem;
