import styled from "styled-components";

const ModalBg = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    background-color: rgba(0, 0, 0, 0.7);
`;
const ModalWrap = styled.div`
    width: 292px;
    height: 390px;
    border-radius: 20px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
`;
const Item = styled.div`
    font-size: 20px;
    font-weight: 400;
    display: flex;
    flex-direction: row;
`;
const Quantity = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 30px;
    margin: 46px 0;

    & > div {
        font-size: 48px;
        font-weight: 400;
    }
`;
const BtnWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export { ModalBg, ModalWrap, Item, Quantity, BtnWrap };
