import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useTodo } from "../../hooks/useTodo";
import FormLoginUser from "../../components/formUser/formUser";
import FormNewUser from "../../components/formNewUser/formNewUser";
import { useLoading } from "../../hooks/useLoading";

export default function PageLogin() {
     const [isNew, setIsNew] = useState(false);
     const navigate = useNavigate();
     const { login, register } = useAuth();
     const { setLoading } = useLoading()
     const { fetchTasks } = useTodo();

     const handleLogin = async (email, password) => {
         setLoading(true);
         try {
             await login(email, password);
             // Carrega as tarefas do usuário após login
             await fetchTasks();
             // Redireciona para Home / Tarefas
             navigate("/tarefas");
         } catch (err) {
             console.error("Erro ao fazer login:", err);
         } finally {
             setLoading(false);
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
