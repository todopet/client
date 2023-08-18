import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { InputContainer, InputText } from "./Input.styles";

interface InputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

function InputComponent({ value, onChange }: InputProps) {
    return (
        <InputContainer>
            <InputText
                type="text"
                value={value}
                onChange={onChange}
                style={{ padding: "10px", fontSize: "16px" }}
            />
        </InputContainer>
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
