import useDetectClose from "@/libs/hooks/useDetectClose";
import {
    Wrapper,
    DropdownContainer,
    DropdownButton,
    Menu,
    Ul,
    Li
} from "./DropDown.styles";

const Dropdown = () => {
    const [categoryIsOpen, categoryRef, categoryHandler] =
        useDetectClose(false);
    return (
        <Wrapper>
            <DropdownContainer>
                <DropdownButton onClick={categoryHandler} ref={categoryRef}>
                    Your Button Here
                </DropdownButton>
                <Menu $isDropped={categoryIsOpen}>
                    <Ul>
                        <Li>메뉴1</Li>
                        <Li>메뉴2</Li>
                        <Li>메뉴3</Li>
                    </Ul>
                </Menu>
            </DropdownContainer>
        </Wrapper>
    );
};

export default Dropdown;
