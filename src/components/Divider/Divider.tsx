import React from "react";
interface DividerProps {
    category: () => string | undefined;
}

export default function Divider({ category }: DividerProps) {
    const itemCategory = category();
    const haslength = !!itemCategory;
    return (
        <div className="w-full flex flex-row items-center justify-between basis-[3%]">
            <div className={haslength ? "w-[45%] h-px bg-[#dfdfdf]" : "w-1/2 h-px bg-[#dfdfdf]"} />
            {haslength && <div className="text-xs text-[#b1aeae]">{itemCategory}</div>}
            <div className={haslength ? "w-[45%] h-px bg-[#dfdfdf]" : "w-1/2 h-px bg-[#dfdfdf]"} />
        </div>
    );
}
