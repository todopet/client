import styled from 'styled-components';
import background from '@/assets/images/background.svg'
import pet from '@/assets/images/pet.svg'

const PageArea = styled.div`
	width: 100%;
	heigth: 100%;
	display: flex;
	flex-direction: column;
`

const MainArea = styled.main`
    height: 77.5vh;
    background-image: url(${background});
    display: flex;
    flex-direction: column;
	position: relative;
`

const PetImg = styled.div`
	background-image: url(${pet});
	position: absolute;
	width: 60%;
	height: 28%;
	left: 20px; bottom: 120px;
`

const MainHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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


export { PageArea, MainArea, PetImg, MainHeader, StatusInfo, LevelInfo, MainBody, MainFooter };