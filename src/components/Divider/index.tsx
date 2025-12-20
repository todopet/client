interface DividerProps {
    category: () => string | undefined;
}

export const Divider = ({ category }: DividerProps) => {
    const itemCategory = category();
    const hasLength = !!itemCategory;
    return (
        <div className="w-full flex flex-row items-center justify-between basis-[3%]">
            <div className={hasLength ? "w-[45%] h-px bg-[#dfdfdf]" : "w-1/2 h-px bg-[#dfdfdf]"} />
            {hasLength && <div className="text-xs text-[#b1aeae]">{itemCategory}</div>}
            <div className={hasLength ? "w-[45%] h-px bg-[#dfdfdf]" : "w-1/2 h-px bg-[#dfdfdf]"} />
        </div>
    );
}