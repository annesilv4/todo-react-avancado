import "./header.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const token = localStorage.getItem("token");
    const nameUser = localStorage.getItem("userName"); // <-- CORRIGIDO

    // Função totalmente segura
    const formatName = (name) => {
        if (!name || typeof name !== "string") return "Usuário";

        const normalized = name.trim().toLowerCase();
        if (!normalized) return "Usuário";

        return normalized.charAt(0).toUpperCase() + normalized.slice(1);
    };

    const userName = formatName(nameUser);

    return (
        <header className="header__page">
            <div className="header__logo">
                <h1 className="header__title">
                    Todo <span>List</span>
                </h1>
                <p className="header__subtitle">Seu gerenciador de tarefas do dia a dia</p>
            </div>

            {token ? (
                <div className="header__user">
                    <div className="header__avatar">
                        <FontAwesomeIcon icon={faUser} className="header__icon" />
                    </div>

                    <p className="header__name">
                        Olá, {userName || "Usuário"}
                    </p>
                </div>
            ) : (
                <button
                    className="header__loginButton"
                    onClick={() => (window.location.href = "/login")}
                >
                    Entrar
                </button>
            )}
        </header>
    );
}
