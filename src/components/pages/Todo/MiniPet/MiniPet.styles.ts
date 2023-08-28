import styled from "styled-components";

const MiniPetWrap = styled.div`
    width: 390px;
    height: 80px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
`;

const MyPet = styled.img`
    max-height: 50px;
    position: absolute;
    z-index: 1;
    bottom: 5px;
`;
const Bg = styled.img`
    width: 390px;
    height: 50px;
`;

export { MiniPetWrap, Bg, MyPet };
