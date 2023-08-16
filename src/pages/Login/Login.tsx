import styled from "styled-components";
import Starts from "@/components/pages/Pet/Stars/Stars";

import mainImage from "@/assets/images/main.png";

export default function Login() {
    return (
        <Container>
            <img src={mainImage} alt="main" />
            <div> todo pet</div>
            <div> 할 일을 완료하며, 펫과 함께 성장하세요.</div>

            <button>구글 아이디로 로그인</button>
            <Starts level={1} />
        </Container>
    );
}

const Container = styled.div``;

// const MainImage = styled()`
//     background:
//         url("@/assets/images/main.png"),
//         lightgray 50% / cover no-repeat;
// `;
