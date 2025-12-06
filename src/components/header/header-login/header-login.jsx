import "./header-login.css";

export default function HeaderLogin() {
    return (
        <header className="header__page">
            <div className="header__logo">
                <h1 className="header__title">Todo <span>List</span></h1>
                <p className="header__subtitle">Seu gerenciador de tarefas do dia a dia</p>
            </div>
        </header>
    )
}