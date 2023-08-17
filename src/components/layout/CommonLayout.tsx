import { FC, PropsWithChildren } from "react";
import { useLocation } from "react-router-dom";
import Footer from "@/components/layout/Footer/Footer";
import Header from "@/components/layout/Header/Header";
interface CommonLayoutProps extends PropsWithChildren {}
const CommonLayout: FC<CommonLayoutProps> = ({ children }) => {
    const location = useLocation();
    const exceptLocation: string[] = ["/", "/category"];

    const isWithHeader = !exceptLocation.includes(location.pathname);
    const isWithFooter = !exceptLocation.includes(location.pathname);
    return (
        <>
            {isWithHeader && <Header />}
            {children}
            {isWithFooter && <Footer />}
        </>
    );
};
export default CommonLayout;
