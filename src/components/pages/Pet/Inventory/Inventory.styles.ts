import styled from "styled-components";

const ModalBg = styled.div`
    position: fixed;
    top: 60px;
    bottom: 70px;
    width: 390px;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 15;
    // backdrop-filter: blur(10px);
`;

const ModalWrap = styled.div<{on: boolean}>`
    position: absolute;
	bottom: 0; left: 0;
	width: 100%;
	height: ${props => props.on === true ? "85" : 0}%;
	border-radius: 30px 30px 0 0;
	background-color: white;
	display: flex;
	flex-direction: column;
	z-index: 20;
	transition: all .5s;
    gap: .5rem;
    overflow: hidden;  // 이거 안하면 ModalWrap의 크기가 0이 되어도 내부 요소들이 다 튀어나와서 화면 밑으로 깔려있음... 왜지?
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
    flex-basis: 12%;
    font-weight: 500;
`;

const ItemList = styled.div`
    display: flex;
    flex-direction: column;
    gap: .5rem;
    flex-basis: 70%;
`;


export { ModalBg, ModalWrap, Title, Count, Header, ItemList };