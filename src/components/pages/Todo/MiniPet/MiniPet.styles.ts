import styled, { keyframes } from "styled-components";

const jump = keyframes`
0% {
  transform: translateY(0px)
}
7% {
  transform: translateY(0px)
}
100% {
  transform: translateY(-20px)
}
`;
const move = keyframes`
0% {
  transform: translateX(0px)
}
100% {
  transform: translateX(390px)
}
`;

const MiniPetWrap = styled.div`
    width: 390px;
    height: 80px;
    background-color: white;
    z-index: 5;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    overflow-x: hidden;
`;

const MyPet = styled.div<{
    petlevel: number | null;
    width: number;
    height: number;
}>`
    background-image: url("/petImages/pet-${(props) => props.petlevel}.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;

    animation: ${jump} 0.6s alternate infinite;
`;
const MyPetWrap = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 5px;
    animation: ${move} 10s linear infinite;
`;
const Bg = styled.img`
    width: 390px;
    height: 50px;
`;

export { MiniPetWrap, Bg, MyPet, MyPetWrap };
