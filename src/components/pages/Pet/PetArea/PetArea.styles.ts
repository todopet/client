import styled from 'styled-components';
// import Button from '@/components/Button/Button'; 
import background from '@/assets/images/background.svg'

// const CircleButton = styled(Button)`
// 	background-image: url(${props => props.url});
// 	background-repeat: no-repeat;
// 	background-position: center;
// 	background-color: ${props => props.color};
// 	width: 60px;
// 	height: 60px;
//   border: ${props => props.border};
// 	border-radius: 50%;
// `

const PageArea = styled.div`
	width: 390px;
	heigth: 844px;
	display: flex;
	flex-direction: column;
`

const MainFooter = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-basis: 20%;
	padding: 0 25px;
`

const MainArea = styled.main`
	height: 77.5vh;
	background-image: url(${background});
	display: flex;
	flex-direction: column;
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

const MainBody = styled.div`
	flex-basis: 58%
`

export { PageArea, MainFooter, MainArea, MainHeader, StatusInfo, MainBody };