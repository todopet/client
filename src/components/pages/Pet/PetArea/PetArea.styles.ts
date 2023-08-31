import styled from 'styled-components';
import petRoom from '@/assets/images/pet_room.svg'
import { FooterButton, MainModalBackdrop } from './PetArea';
import { ModalTitle } from '@/components/pages/MyPage/UserInfo/UserInfo.styles';
import joyEmotion from '@/assets/images/joyEmotion.png.png'
import sadEmotion from '@/assets/images/sadEmotion.png.png'
import exclamationMark from '@/assets/icons/exclamationMark.svg'
import levelStar from '@/assets/icons/levelStar.svg';

const MainArea = styled.main`
    height: 100%;
	width: 100%;
    background-image: url(${petRoom});
	background-repeat: no-repeat;
	background-size: cover;
	background-position: center;
    display: flex;
    flex-direction: column;
	position: relative;
`

const PetImg = styled.div<{ 
	level: number | null,
	width: number,
	height: number,
	left: number,
	bottom: number
}>`
	background-image: url("/petImages/pet-${props => props.level}.gif");
	background-repeat: no-repeat;
    background-position: center;
	background-size: contain;
	position: absolute;
	width: ${props => props.width}%;
	height: ${props => props.height}%;
	left: ${props => props.left}%;
	bottom: ${props => props.bottom}%;
`

const EmotionImg = styled.div<{ 
	on: boolean, 
	status: string,
	width: number,
	height: number,
	top: number
	left: number
}>`
	background-image: url(${props => props.status === "joy" ? joyEmotion : props.status === "sad" ? sadEmotion : false });
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	position: absolute;
	width: ${props => props.width}%;
	height: ${props => props.height}%;
	top: ${props => props.top}%;
	left: ${props => props.left}%;
	display: ${props => props.on ? "inline-block" : "none"};
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
	margin-left: 1.5%;
`

const LevelInfo = styled.div`
    margin-top: 5px;
    margin-right: 20px;
`

const PetLevelNameArea = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 15px;
	height: 20%;
	width: 100%;
	position: relative;
`

const LevelStar = styled.div`
	background-image: url(${levelStar});
	background-repeat: no-repeat;
	background-position: center;
	background-size: contain;
	width: 25%;
	height: 110%;
	display: flex;
	justify-content: center;
	align-items: center;
	position: absolute;
	left: 10%;
`

const Level = styled.p`
	font-size: 1.3rem;
	font-weight: bold;
	color: white;
	padding-top: 10%;
	margin: 0;
`

const PetNameBox = styled.div`
	background-color: white;
	border-radius: 8px;
	width: 70%;
	height: 90%;
	margin-left: 10%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const PetName = styled.p`
	font-size: 1rem;
	font-weight: bold;
	margin: 0;
	height: 30px;
	line-height: 30px;
	padding-left: 6%;
`

const MainBody = styled.div`
	flex-basis: 58%;
`

const MainFooter = styled.div`
	display: flex;
	justify-content: flex-end;
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

const InventoryFullImg = styled.div<{on: boolean}>`
	background-image: url(${exclamationMark});
	background-repeat: no-repeat;
	background-position: center;
	background-size: cover;
	background-color: white;
	border-radius: 50%;
	position: absolute;
	width: 7.1%;
	height: 3.85%;
	bottom: 12.3%;
	right: 5.5%;
	display: ${props => props.on ? "inline-block" : "none"};
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


export { 
	MainArea, 
	PetImg, 
	EmotionImg, 
	MainHeader, 
	StatusInfo, 
	LevelInfo, 
	PetLevelNameArea, 
	LevelStar,
	Level,
	PetNameBox,
	PetName,
	MainBody, 
	MainFooter, 
	MainFooterButton, 
	InventoryFullImg, 
	AchModalBackdrop, 
	AchModal, 
	AchModalTitle, 
	AchArea, 
	AchWrapper 
};