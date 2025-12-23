import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import FormLoginUser from "../../components/formUser/formUser";
import FormNewUser from "../../components/formNewUser/formNewUser";

export default function PageLogin() {
    const [isNew, setIsNew] = useState(false);
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const handleLogin = async (email, password) => {
        try {
            await login(email, password);
            // Redireciona para Home / Tarefas
            navigate("/tarefas");
        } catch (err) {
            console.error("Erro ao fazer login:", err);
        }
    };

    const handleRegister = async (formData) => {
        try {
            await register(formData);
            console.log("Usuário criado com sucesso");
            setIsNew(false);
        } catch (err) {
            console.error("Erro ao registrar:", err);
        }
    };

    return (
        <>
            {isNew ? (
                <FormNewUser onBackToLogin={() => setIsNew(false)} onRegister={handleRegister} />
            ) : (
                <FormLoginUser onGoToRegister={() => setIsNew(true)} onLogin={handleLogin} />
            )}
        </>
    );
}
