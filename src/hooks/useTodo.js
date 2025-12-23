import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";

export function useTodo() {
    const context = useContext(TodoContext);

    if (!context) {
        throw new Error("useTodo deve ser usado dentro de um TodoProvider");
    }

    return context;
}
