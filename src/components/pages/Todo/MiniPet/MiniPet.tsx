import { MiniPetStyle } from "./MiniPet.styles";
import { ReactComponent as PetSvg } from "@/assets/images/move1.svg";

export default function MiniPet() {
    return (
        <div>
            <MiniPetStyle>
                MiniPet Area
                <PetSvg />
            </MiniPetStyle>
        </div>
    );
}
