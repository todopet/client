import styled from "styled-components";

const ItemInfo = styled.div`
    display: flex;
    cursor: pointer;
    
    &:hover { opacity: .6 }
`;

const ItemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 132px;
    padding: 18px 18px;
    display: flex;
    flex-direction: row;
    position: relative;
`;

const ItemImage = styled.div`
    position: relative;
    & > div:nth-child(2) {
        position: absolute;
        bottom: 6px;
    }
`

const ItemDes = styled.div`
    display: flex;
    flex-direction: column;
`

const ItemInfoRow = styled.div`
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const ItemIcon = styled.div<{ imageurl: string }>`
    background-image: url(${props => props.imageurl});
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 96px;
    margin-right: 18px;
    border: 0;
    background-color: transparent;
`

const ItemName = styled.div`
    font-size: 20px;
    color: #545353;
    align-self: flex-end;
`;

const Itemdescription = styled.div`
    font-size: 15px;
    color: #545353;
`;

const DiscardBtnStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items; center;
    position: absolute;
    width: 50px; height: 50px;
    right: 8px; top: 17px;
    & > button {
        width: 100%; height: 100%;
        border: 0;
        background-color: transparent;
        z-index: 2;

        &:hover {
            opacity: .5;
            cursor: pointer;
        }
    }
`;

export {
    ItemWrap,
    ItemInfo,
    ItemImage,
    ItemDes,
    ItemInfoRow,
    ItemIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
};