import "./header.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    const isLogged = localStorage.getItem("token"); // <-- verificação
    const userName = localStorage.getItem("userName"); // opcional

    return (
        <header className="header__page">
            <div className="header__logo">
                <h1 className="header__title">Todo <span>List</span></h1>
                <p className="header__subtitle">Seu gerenciador de tarefas do dia a dia</p>
            </div>

            {isLogged ? (
                // SE ESTÁ LOGADO
                <div className="header__user">
                    <div className="header__avatar">
                        <FontAwesomeIcon icon={faUser} className="header__icon" />
                    </div>
                    <p className="header__name">
                        Olá, {userName ? userName : "Usuário"}
                    </p>
                </div>

            ) : (
                // SE NÃO ESTÁ LOGADO
                <button
                    className="header__loginButton"
                    onClick={() => (window.location.href = "/login")}
                >
                    Entrar
                </button>
            )}
        </header>
    )
}