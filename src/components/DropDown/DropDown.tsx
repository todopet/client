import useDetectClose from "@/libs/hooks/useDetectClose";
import {
    Wrapper,
    DropdownContainer,
    DropdownButton,
    Menu,
    Ul,
    Li,
    Label,
    Link
} from "./DropDown.styles";
import { PropsWithChildren } from "react";
import { StyleSheetManager } from "styled-components";

interface ListItem {
    content: string;
    svg?: React.ReactNode; // React 컴포넌트 형태로 받을 수 있도록 설정
    href?: string; //클릭시 주소이동을 원할시 사용
    handleClick?: () => void; //클릭시 원하는 기능 적용
}
interface ListProps extends PropsWithChildren {
    list: ListItem[];
}

//사용하려는 카테고리 목록(list)을 props로 전달, 버튼으로 사용할 컴포넌트(children)를 추가해주세요.
const Dropdown = ({ list, children }: ListProps) => {
    const [categoryIsOpen, categoryRef, categoryHandler] =
        useDetectClose(false);
    const hasAnySvg = list.some((item) => !!item.svg);
    return (
        <Wrapper>
            <DropdownContainer>
                <DropdownButton onClick={categoryHandler} ref={categoryRef}>
                    {children}
                    <Menu $isDropped={categoryIsOpen}>
                        <Ul>
                            <StyleSheetManager
                                shouldForwardProp={(prop) =>
                                    !["centercontent"].includes(prop)
                                }
                            >
                                {list.map((item, index) => (
                                    <Li
                                        key={index}
                                        centercontent={hasAnySvg}
                                        onClick={item.handleClick}
                                    >
                                        <Link href={item.href}>
                                            <Label>{item.content}</Label>
                                            {item.svg && item.svg}
                                        </Link>
                                        {/* {item.svg && item.svg} */}
                                    </Li>
                                ))}
                            </StyleSheetManager>
                        </Ul>
                    </Menu>
                </DropdownButton>
            </DropdownContainer>
        </Wrapper>
    );
};

export default Dropdown;
