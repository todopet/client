import { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
}

export const Label = ({ children }: LabelProps) => {
    return <span className="label">{children}</span>;
}