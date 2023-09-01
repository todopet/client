import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
import {
    HeaderContainer,
    LogoContainer,
    ButtonCatainer
} from "./Header.styles";
import Dropdown from "@/components/DropDown/DropDown";
import { ReactComponent as HeaderMenuIcon } from "@/assets/icons/headerMenu.svg";
import { ReactComponent as PlusIcon } from "@/assets/icons/plus.svg";

export default function Header() {
    const location = useLocation();
    //DropDown의 props
    const listItems = [
        {
            content: "목표등록",
            href: "/category/post", // 경로 설정
            svg: <PlusIcon />
        },
        {
            content: "목표관리",
            href: "/category/list"
        }
    ];

    const isDropDown = location.pathname === "/todo";

    return (
        <HeaderContainer>
            <LogoContainer>
                <Link to="/todo">
                    <Logo />
                </Link>
            </LogoContainer>
            <ButtonCatainer>
                {isDropDown && (
                    <Dropdown list={listItems}>
                        <HeaderMenuIcon />
                    </Dropdown>
                )}
            </ButtonCatainer>
        </HeaderContainer>
    );
}
