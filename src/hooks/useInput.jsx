import { useState } from "react";

export default function useInput(initialValue = "") {
    const [valor, setValor] = useState(initialValue);

    const onChange = (e) => {
        setValor(e.target.value);
    };

    const reset = () => {
        setValor("");
    }

    return {
        valor,
        onChange,
        reset,
    };
}