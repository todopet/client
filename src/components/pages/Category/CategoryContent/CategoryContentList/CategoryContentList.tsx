import React from "react";
import { Text, ButtonWrap, Wrap } from "./CategoryContentList.styles";
import { category } from "@/@types/index";
import CategoryContentListItem from "./CategoryContentListItem/CategoryContentListItem";

interface CategoryListProps {
    categoryList: category[];
}

const CategoryContentList: React.FC<CategoryListProps> = ({ categoryList }) => {
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

export default CategoryContentList;
