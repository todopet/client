import styled from "styled-components";

import { ReactComponent as cakeIcon } from "@/assets/itemImages/cake.svg"; //임시 이미지

const ItemInfo = styled.div``;
const ItemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 132px;
    padding: 18px 18px;
    display: flex;
    flex-direction: row;

    & > ${ItemInfo}:nth-child(1) {
        position: relative;
        & > div {
            position: absolute;
            bottom: 6px;
        }
    }
    & > ${ItemInfo}:nth-child(2) {
        display: flex;
        flex-direction: column;
    }
`;
const ItemInfoRow = styled.div`
    height: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;
// const ItemIcon = styled.div`
//     background-image: url(${props => props.url});
//     background-repeat: no-repeat;
//     background-position: center;
//     width: 100px;
//     height: 96px;
//     margin-right: 18px;
//     cursor: pointer;

//     &:hover { opacity: .6 }
// `
const StyledCakeIcon = styled(cakeIcon)`
    width: 100px;
    height: 96px;
    margin-right: 18px;
    cursor: pointer;

    &:hover { opacity: .6 }
`;
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
    align-self: center;
    position: relative;
    flex-basis: 15%;
    height: 100%;
    & > button {
        position: absolute;
        top: 3px; left: 5px;
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
    ItemInfoRow,
    StyledCakeIcon,
    ItemName,
    Itemdescription,
    DiscardBtnStyled
};
