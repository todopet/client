import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../Logo";
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
        <header className="fixed top-0 z-10 w-[390px] left-1/2 -translate-x-1/2 h-[60px] bg-white flex items-center justify-between px-0 box-border">
            <div>
                <Link to="/todo" className="no-underline">
                    <Logo />
                </Link>
            </div>
            <div className="mr-4">
                {isDropDown && (
                    <Dropdown list={listItems}>
                        <HeaderMenuIcon />
                    </Dropdown>
                )}
            </div>
        </header>
    );
}
