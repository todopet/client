import styled from "styled-components";

const MiniPetWrap = styled.div`
    width: 390px;
    height: 80px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow-x: hidden;
`;

const MyPet = styled.div<{
    petlevel: number;
    width: number;
    height: number;
}>`
    background-image: url("/petImages/pet-${(props) => props.petlevel}.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    position: absolute;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    position: absolute;
    z-index: 1;
    bottom: 5px;
`;
// const MyPet = styled.img`
//     max-height: 50px;
//     position: absolute;
//     z-index: 1;
//     bottom: 5px;
// `;
const Bg = styled.img`
    width: 390px;
    height: 50px;
`;

export { MiniPetWrap, Bg, MyPet };
