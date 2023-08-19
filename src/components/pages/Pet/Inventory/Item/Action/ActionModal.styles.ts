import styled from "styled-components";

// width: 100%;
// height: 100%;
// position: absolute;
// top: 0;
// background-color: rgba(0, 0, 0, 0.5);
const ModalBg = styled.div`
    position: absolute;
    top: 0; bottom: 0;
    left: 0; right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
`;

// width: 292px;
// height: 390px;
// border-radius: 20px;
// background-color: #ffffff;
// display: flex;
// flex-direction: column;
// justify-content: center;
// align-items: center;
// z-index: 10;
const ModalWrap = styled.div`
    position: absolute;
    width: 292px;
    height: 390px;
    border-radius: 20px;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 10;
    top: 
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
