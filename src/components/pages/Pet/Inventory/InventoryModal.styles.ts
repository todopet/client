import styled from "styled-components";

const ModalBg = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
`;

const ModalWrap = styled.div`
    width: 100%;
    height: 588px;
    background-color: #ffffff;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    position: fixed;
    bottom: 0;
    z-index: 10;
`;

const Title = styled.div`
    font-size: 12px;
`;

const Count = styled.div`
    font-size: 12px;
    padding: 4px 4px;
    border-bottom: 1.7px solid;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 27px;
    font-weight: 500;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    margin: 12px 0;
`;

export { ModalBg, ModalWrap, Title, Count, Header, ItemList };
