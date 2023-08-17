import React from "react";

import { ItemCount } from "./ItemQtyLabel.styles";

interface ItemQtyLabelProps {
    count: number;
}

export default function ItemQtyLabel({ count }: ItemQtyLabelProps) {
    return (
        <ItemCount>
            <span>x</span>
            <span>{count}</span>
        </ItemCount>
    );
}
