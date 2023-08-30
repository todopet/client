import { css, keyframes, styled } from "styled-components";

const fadein = keyframes`
  0% { top: 60%; opacity: 0; }
  100% { top: 55%; opacity: 1; }
`;
const fadeout = keyframes`
  0% { top: 55%; opacity: 1; }
  100% { top: 60%; opacity: 0; }
`;

interface ToastWrapProps {
    show: boolean;
    bgcolor: "black" | "white";
}

const ToastWrap = styled.div<ToastWrapProps>`
    visibility: ${(props) => (props.show ? "visible" : "hidden")};

    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    white-space: nowrap;
    color: ${(props) => (props.bgcolor === "black" ? "#ffffff" : "#000000")};
    background: ${(props) =>
        props.bgcolor === "black"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.85)"};

    text-align: center;
    font-family: Inter;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    z-index: 10;
    position: absolute;

    //커스텀 요소
    min-width: 250px;
    min-height: 45px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 4px 10px;

    animation: ${(props) =>
        props.show
            ? css`
                  ${fadein} 1s, ${fadeout} 1s 3.5s
              `
            : "none"};
    animation-fill-mode: forwards;
`;

export { ToastWrap };
