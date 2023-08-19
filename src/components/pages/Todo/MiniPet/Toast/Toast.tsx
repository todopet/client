import { styled } from 'styled-components';
import { ToastStyle } from './Toast.styles';

const Text = styled.p`
    font-size: 14px;
    text-align: center;
    margin: auto auto;
`;

export default function Toast() {
    return (
        <ToastStyle>
            <Text>할 일을 완료하여<br/>'사료'(을)를 받았습니다!</Text>
        </ToastStyle>
    );
}

//{isNormal ? normalText : specialText}
// "할 일을 완료하여 '사료'(을)를 받았습니다!";
// "특별한 보상으로 '고급 사료'(을)를 받았습니다!!! 짝짝짝";