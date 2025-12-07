import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser, loginUser } from "../../api/apiUsuario";
import FormLoginUser from "../../components/formUser/formUser";
import FormNewUser from "../../components/formNewUser/formNewUser";

export default function PageLogin() {
    const [isNew, setIsNew] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const user = await loginUser(email, password);

        if (!user) {
            console.error("Email ou senha inválidos");
            return;
        }

        // ⭐ SALVA LOGIN AQUI ⭐
        localStorage.setItem("token", user._id);
        localStorage.setItem("userName", user.name);

        console.log("Login realizado com sucesso");

        // Redireciona para Home / Tarefas
        navigate("/");
    };

    const handleRegister = async (formData) => {
        await createUser(formData);
        console.log("Usuário criado com sucesso");

        setIsNew(false);
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
