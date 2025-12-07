import HeaderLogin from "../header/header-login/header-login";
import Footer from "../footer/footer";
import "./formUser.css";
import { Link } from "react-router-dom";

export default function FormLoginUser({ onGoToRegister, onLogin }) {

    const handleSubmit = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        onLogin(email, password); // <-- CHAMA O LOGIN
    };

    return (
        <>
            <title>Todo List - Login</title>
            <HeaderLogin />

            <main>
                <div className="form__login">
                    <h1 className="formLogin__title">Login</h1>

                    <form onSubmit={handleSubmit}>   {/* <-- AQUI */}
                        <div className="login__email">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required />
                        </div>

                        <div className="login__password">
                            <label htmlFor="password">Senha</label>
                            <input type="password" id="password" name="password" required />
                        </div>

                        <button type="submit" className="form__login-button">
                            Entrar
                        </button>
                    </form>

                    <p className="form__newRegister">
                        Não tem uma conta?
                        <Link
                            onClick={onGoToRegister}
                            className="form__register-link"
                        >
                            Crie uma agora!
                        </Link>
                    </p>
                </div>
            </main>

            <Footer />
        </>
    );
}
