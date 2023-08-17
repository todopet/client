import { MiniPetStyle } from "./MiniPet.styles";
import background from "@/assets/images/miniPetBackground.png";

export default function MiniPet() {
    return (
        <MiniPetStyle>
            <img src={background} alt="background" />
        </MiniPetStyle>
    );
}
