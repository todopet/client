import React from "react";
import Logo from "../Logo";
import { HeaderContainer, LogoContainer } from "./Header.styles";

export default function Header() {
    return (
        <HeaderContainer>
            <LogoContainer>
                <Logo />
            </LogoContainer>
        </HeaderContainer>
    );
}
