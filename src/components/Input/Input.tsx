import React, { ChangeEvent, ChangeEventHandler, useState } from "react";

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function InputComponent({ value, onChange }: InputProps) {
    return (
        <div className="flex flex-col justify-center items-center">
            <input
                type="text"
                value={value}
                onChange={onChange}
                className="w-[20.9375rem] h-6 flex-col justify-center shrink-0 text-base border-0 border-b-2 border-[#ccc] px-[10px]"
            />
        </div>
    );
}

const Input: React.FC = () => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setInputValue(target.value);
    };

    return (
        <div>
            <InputComponent value={inputValue} onChange={handleInputChange} />
        </div>
    );
};

export default Input;
