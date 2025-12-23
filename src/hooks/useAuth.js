import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export function useAuth() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um UserProvider");
    }

    return context;
}
