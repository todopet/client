import { NavWrap, ButtonStyled } from "@/components/pages/Pet/Inventory/Nav/Nav.styles";
import { FeedIcon, HeartIcon, RestIcon, WashIcon, HiddenIcon } from "@/modules/icons";

interface categoryType {
  activeCategory: string;
  setActiveCategory(categoryName: string): void;
}

export const Nav = ({ activeCategory, setActiveCategory }: categoryType) => {
  return (
    <NavWrap>
      <ButtonStyled
        on={activeCategory === "feed"}
        onClick={() => {
          setActiveCategory("feed");
        }}
      >
        <img src={FeedIcon} alt="feed" />
      </ButtonStyled>
      <ButtonStyled
        on={activeCategory === "play"}
        onClick={() => {
          setActiveCategory("play");
        }}
      >
        <img src={HeartIcon} alt="play" />
      </ButtonStyled>
      <ButtonStyled
        on={activeCategory === "rest"}
        onClick={() => {
          setActiveCategory("rest");
        }}
      >
        <img src={RestIcon} alt="rest" />
      </ButtonStyled>
      <ButtonStyled
        on={activeCategory === "wash"}
        onClick={() => {
          setActiveCategory("wash");
        }}
      >
        <img src={WashIcon} alt="wash" />
      </ButtonStyled>
      <ButtonStyled
        on={activeCategory === "hidden"}
        onClick={() => {
          setActiveCategory("hidden");
        }}
      >
        <img src={HiddenIcon} alt="hidden" />
      </ButtonStyled>
    </NavWrap>
  );
}