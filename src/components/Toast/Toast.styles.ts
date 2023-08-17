import { css, keyframes, styled } from "styled-components";

// const fadein = keyframes`
//   0% { top: 0px; opacity: 0; }
//   100% { top: -30px; opacity: 1; }
// `;
// const fadeout = keyframes`
//   0% { top: -30px; opacity: 1; }
//   100% { top: 0px; opacity: 0; }
// `;

/* interface SnackbarProps {
    show: boolean;
} */

const Snackbar1 = styled.div`
    // styled.div<SnackbarProps>
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 16.875rem;
    height: 3.125rem;
    flex-shrink: 0;
    color: #fff;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    z-index: 100;
    position: absolute;
    visibility: visible;
    background-color: rgba(0, 0, 0, 0.53);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 0.625rem;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;

const Snackbar2 = styled.div`
    // styled.div<SnackbarProps>
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 16.875rem;
    height: 3.125rem;
    flex-shrink: 0;

    color: #000;
    text-align: center;
    font-family: Inter;
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;

    z-index: 100;
    position: relative;
    visibility: visible;

    border-radius: 0.625rem;
    background: rgba(255, 255, 255, 0.85);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

    border-radius: 0.625rem;
    padding: 1rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;

export { Snackbar1, Snackbar2 };
/* visibility: ${(props) => (props.show ? "visible" : "hidden")}; */
/* -webkit-animation: ${(props) =>
        props.show
            ? css`
                  ${fadein} 0.5s, ${fadeout} 0.5s 2.5s
              `
            : ""};
    animation: ${(props) =>
        props.show
            ? css`
                  ${fadein} 0.5s, ${fadeout} 0.5s 2.5s
              `
            : ""};
    animation-fill-mode: forwards; */
