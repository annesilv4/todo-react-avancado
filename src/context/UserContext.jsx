import { createContext, useState, useCallback, useEffect } from "react";
import { loginUser, createUser } from "../api/apiUsuario";

// 1. Criar o contexto
export const UserContext = createContext();

// 2. Criar o Provider (componente que envolve a app)
export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Verificar se há usuário logado ao montar (localStorage)
    useEffect(() => {
        const userId = localStorage.getItem("token");
        const userName = localStorage.getItem("userName");

        if (userId && userName) {
            setUser({
                _id: userId,
                name: userName,
            });
        }
    }, []);

    // Função para fazer LOGIN
    const handleLogin = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const userData = await loginUser(email, password);

            if (!userData) {
                throw new Error("Email ou senha inválidos");
            }

            // Salva no localStorage
            localStorage.setItem("token", userData._id);
            localStorage.setItem("userName", userData.name);

            // Salva no estado
            setUser({
                _id: userData._id,
                name: userData.name,
            });

            console.log("Login realizado com sucesso");
            return userData;
        } catch (err) {
            console.error("[ ERROR LOGIN ]", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Função para REGISTRAR novo usuário
    const handleRegister = useCallback(async (formData) => {
        setLoading(true);
        setError(null);
        try {
            const newUser = await createUser(formData);
            console.log("Usuário criado com sucesso");
            return newUser;
        } catch (err) {
            console.error("[ ERROR REGISTER ]", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Função para fazer LOGOUT
    const handleLogout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userName");
        setUser(null);
        console.log("Logout realizado com sucesso");
    }, []);

    // Objeto com valores e funções do contexto
    const value = {
        user,                      // { _id, name } ou null
        loading,
        error,
        isAuthenticated: !!user,   // true se logado, false se não
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
}
