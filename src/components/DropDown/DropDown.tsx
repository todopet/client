import useDetectClose from "@/libs/hooks/useDetectClose";
import {
    Wrapper,
    DropdownContainer,
    DropdownButton,
    Menu,
    Ul,
    Li,
    Link
} from "./DropDown.styles";

interface ListItem {
    content: string;
    svg?: React.ReactNode; // React 컴포넌트 형태로 받을 수 있도록 설정
    href?: string; //클릭시 주소이동을 원할시 사용
    handleClick?: () => void; //클릭시 원하는 기능 적용
}
interface ListProps {
    list: ListItem[];
    children: React.ReactNode;
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
                </DropdownButton>
                <Menu $isDropped={categoryIsOpen}>
                    <Ul>
                        {list.map((item, index) => (
                            <Li
                                centerContent={hasAnySvg}
                                onClick={item.handleClick}
                            >
                                <Link href={item.href}>{item.content}</Link>
                                {item.svg && item.svg}
                            </Li>
                        ))}
                    </Ul>
                </Menu>
            </DropdownContainer>
        </Wrapper>
    );
};

export default Dropdown;
