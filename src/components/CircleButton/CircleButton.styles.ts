import styled from "styled-components";
import Button from "@/components/Button/Button";

const BaseButton = styled(Button)`
    // 이거 버튼 불러와서 에러 발생시키길래 우선 주석처리 해놨어용 나중에 해결해야 합니다.
    /*background-image: url({(props) => props.url});*/
    background-repeat: no-repeat;
    background-position: center;
    /*background-color: {(props) => props.color};*/
    width: 70px;
    height: 70px;
    /*border: {(props) => props.border};*/
    border-radius: 50%;
`;

export default BaseButton;
