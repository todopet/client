import styled from 'styled-components';
import Button from '@/components/Button/Button'; 

const BaseButton = styled(Button)`
	background-image: url(${props => props.url});
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${props => props.color};
	width: 70px;
	height: 70px;
	border: ${props => props.border};
	border-radius: 50%;
`

export default BaseButton;