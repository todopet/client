import React, { ReactNode } from "react";

interface LabelProps {
    children: ReactNode;
}

function Label({ children }: LabelProps) {
    return <span className="label">{children}</span>;
}

export default Label;
