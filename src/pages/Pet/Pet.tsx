import { PetArea } from '@/components/pages/Pet/PetArea/PetArea';
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer/Footer";
import { PetWrapper } from './Pet.styles';

export default function Pet() {
    return (
        <PetWrapper>
            <Header></Header>
            <PetArea></PetArea>
            <Footer></Footer>
        </PetWrapper>
    );
}
