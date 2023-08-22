import styled from "styled-components";

const MiniPetWrap = styled.div`
    width: 390px;
    height: 50px;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    overflow: hidden;
`;

const MyPet = styled.img`
    width: 48px;
    height: 32px;
    position: absolute;
    z-index: 2;
    bottom: 5px;
`;
const Bg = styled.img`
    width: 390px;
    height: 50px;
`;

export { MiniPetWrap, MyPet, Bg };
