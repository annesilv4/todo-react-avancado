import "./header.css";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Header() {
    return (
        <header className="header__page">
            <div className="header__logo">
                <h1 className="header__title">Todo <span>List</span></h1>
                <p className="header__subtitle">Seu gerenciador de tarefas do dia a dia</p>
            </div>

            <div className="header__user">
                <div className="header__avatar">
                    <FontAwesomeIcon icon={faUser} className="header__icon" />
                </div>
                <p className="header__name">Olá Usuário</p>
            </div>
        </header>
    )
}