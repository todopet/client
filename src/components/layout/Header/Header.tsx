import React from "react";
import Logo from "../Logo";
import {
    HeaderContainer,
    LogoContainer,
    ButtonCatainer
} from "./Header.styles";
import Dropdown from "@/components/DropDown/DropDown";

export default function Header() {
    //DropDown의 props
    const listItems = [
        {
            content: "목표관리",
            href: "/category/list"
        },
        {
            content: "목표등록",
            href: "/category/post" // 경로 설정
        }
    ];

    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo />
            </LogoContainer>
            <ButtonCatainer>
                <Dropdown list={listItems}>...</Dropdown>
            </ButtonCatainer>
        </HeaderContainer>
    );
}
