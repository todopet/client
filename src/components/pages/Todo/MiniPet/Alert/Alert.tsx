import { AlertStyle } from './Alert.styles';

const normalText = "할 일을 완료하여 '사료'(을)를 받았습니다!";
const specialText = "특별한 보상으로 '고급 사료'(을)를 받았습니다!!! 짝짝짝";

export default function Alert(isNormal:boolean) {
    return (
        <AlertStyle>{isNormal ? normalText : specialText}</AlertStyle>
    );
}
