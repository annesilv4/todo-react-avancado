import "./formTarefa.css"
import Header from "../header/header";
import Footer from "../footer/footer";

export default function FormTarefa() {
    return (
        <>
            <title>Todo List - Criando Tarefa</title>
            <Header />

            <main>
                <h1 className="formTarefa__title">Descreva sua Tarefa</h1>

                <div className="form">
                    <form>
                        <div className="form__title">
                            <label htmlFor="tarefa">Título da Tarefa</label>
                            <input type="text" id="tarefa" name="tarefa" />
                        </div>

                        <div className="form__description">
                            <label htmlFor="description__task">Descrição da Tarefa</label>
                            <textarea id="description__task" name="description__task"></textarea>
                        </div>

                        <div className="form__data">
                            <div className="form__dateStart">
                                <label htmlFor="data">Data de Início</label>
                                <input type="date" id="data" name="data" />
                            </div>
                            <div className="form__dateEnd">
                                <label htmlFor="data">Data de Fim</label>
                                <input type="date" id="data" name="data" />
                            </div>
                        </div>

                        <div className="form__time">
                            <label htmlFor="hora">Horario de Entrega</label>
                            <input type="time" id="hora" name="hora" />
                        </div>

                        <button className="btn__newTask" type="submit">Criar Tarefa</button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}