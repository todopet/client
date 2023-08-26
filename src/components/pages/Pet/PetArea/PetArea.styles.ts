import styled from 'styled-components';
import petRoom from '@/assets/images/pet_room.svg'
// import pet from '@/assets/images/pet-example.svg'
import { FooterButton, MainModalBackdrop } from './PetArea';
import { ModalTitle } from '@/components/pages/MyPage/UserInfo/UserInfo.styles';

const MainArea = styled.main`
    height: 100%;
    background-image: url(${petRoom});
    display: flex;
    flex-direction: column;
	position: relative;
`

const PetImg = styled.div<{ 
	level: number,
	width: number,
	height: number,
	left: number,
	bottom: number
}>`
	background-image: url("/petImages/pet-${props => props.level}.png");
	background-repeat: no-repeat;
    background-position: center;
	background-size: contain;
	position: absolute;
	width: ${props => props.width}%;
	height: ${props => props.height}%;
	left: ${props => props.left}%;
	bottom: ${props => props.bottom}%;
`

const MainHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    flex-basis: 22%;
`

const StatusInfo = styled.div`
	display: flex;
	flex-direction: column;
	width: 50%;
`

const LevelInfo = styled.div`
    margin-top: 5px;
    margin-right: 20px;
`

const MainBody = styled.div`
	flex-basis: 58%;
`

const MainFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-basis: 20%;
	padding: 0 25px;
`

const MainFooterButton = styled(FooterButton)`
	cursor: pointer;
	&:hover {
		filter: brightness(110%);
	}
`

const AchModalBackdrop = styled(MainModalBackdrop)``

const AchModal = styled.div<{on: boolean}>`
	position: absolute;
	bottom: 0; left: 0;
	width: 100%;
	height: ${props => props.on === true ? "85" : 0}%;
	border-radius: 30px 30px 0 0;
	background-color: white;
	display: flex;
	flex-direction: column;
	z-index: 1;
	transition: all .5s;
	gap: .5rem;
`

const AchModalTitle = styled(ModalTitle)`
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 10%;
	margin: 0;
`

const AchArea = styled.div`
	width: 100%;
	height: 90%;
	overflow-y: auto;
`

const AchWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 1rem;
`


export { MainArea, PetImg, MainHeader, StatusInfo, LevelInfo, MainBody, MainFooter, MainFooterButton, AchModalBackdrop, AchModal, AchModalTitle, AchArea, AchWrapper };