import React from "react";
import { Text, ButtonWrap, Wrap } from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentList.styles";
import { Category } from "@/@types";
import { CategoryContentListItem } from "@/components/pages/Category/CategoryContent/CategoryContentList/CategoryContentListItem";

interface CategoryListProps {
    categoryList: Category[];
}

export const CategoryContentList: React.FC<CategoryListProps> = ({ categoryList }) => {
    return (
        <Wrap>
            <Text>진행 중인 목표</Text>
            <ButtonWrap>
                {categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            !category.ended && (
                                <CategoryContentListItem
                                    key={category._id}
                                    category={category}
                                ></CategoryContentListItem>
                            )
                        );
                    })}
            </ButtonWrap>
            <Text>종료된 목표</Text>
            <ButtonWrap>
                {categoryList.length > 0 &&
                    categoryList.map((category) => {
                        return (
                            category.ended && (
                                <CategoryContentListItem
                                    key={category._id}
                                    category={category}
                                ></CategoryContentListItem>
                            )
                        );
                    })}
            </ButtonWrap>
        </Wrap>
    );
};
