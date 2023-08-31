import Spinner from "@/assets/images/spinner.gif";

import { LoadingWrap } from "./Loading.styles";

export default function Loading() {
    return (
        <LoadingWrap>
            <img src={Spinner} alt="Loading"></img>
        </LoadingWrap>
    );
}
