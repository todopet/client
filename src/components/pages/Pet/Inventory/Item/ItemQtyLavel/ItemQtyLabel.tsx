interface ItemQtyLabelProps {
    count: number;
}

export const ItemQtyLabel = ({ count }: ItemQtyLabelProps) => {
    return (
        <div className="absolute bottom-[6px] flex justify-center items-baseline w-[46px] h-6 rounded-[25px] bg-[#d9d9d9] opacity-90 text-[20px] text-[#545353]">
            <span className="text-[16px] mr-[1px]">x</span>
            <span className="font-semibold">{count}</span>
        </div>
    );
}