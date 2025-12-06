import "./formNewUser.css";
import HeaderLogin from "../header/header-login/header-login";
import Footer from "../footer/footer";

export default function FormNewUser() {
    return (
        <div>
            <title>Todo List - Cadastro de Usuário</title>

            <HeaderLogin />

            <main>
                <div className="form__newUser">
                    <h1 className="form__title">Cadastro de Usuário</h1>

                    <form action="" className="form__cadasterUser">
                        <div className="form__cadasterFirstName">
                            <label htmlFor="name">Nome:</label>
                            <input type="text" name="nome" id="name" placeholder="Digite seu nome" />
                        </div>

                        <div className="form__cadasterLastName">
                            <label htmlFor="sobrenome">Sobrenome:</label>
                            <input type="text" name="sobrenome" id="sobrenome" placeholder="Digite seu sobrenome" />
                        </div>

                        <div className="form__cadasterUserEmail">
                            <label htmlFor="email">E-mail:</label>
                            <input type="email" name="email" id="email" placeholder="Digite seu e-mail" />
                        </div>

                        <div className="form__cadasterUserPassword">
                            <label htmlFor="senha">Senha:</label>
                            <input type="password" name="senha" id="senha" placeholder="Digite sua senha" />
                        </div>

                        <div className="form__cadasterUserConfirmPassword">
                            <label htmlFor="confirmarSenha">Confirmar senha:</label>
                            <input type="password" name="confirmarSenha" id="confirmarSenha" placeholder="Confirme sua senha" />
                        </div>

                        <button type="submit" className="btn__cadasterUser">Cadastrar</button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
