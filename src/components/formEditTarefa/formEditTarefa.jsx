import "./formEditTarefa.css"
import Header from "../header/header";
import Footer from "../footer/footer";
import useInput from "../../hooks/useInput";

export default function FormEditTarefa() {
    const task = useInput("");
    const description = useInput("");
    const dateStart = useInput("");
    const dateEnd = useInput("");
    const time = useInput("");

    return (
        <>
            <title>Todo List - Editando Tarefa</title>
            <Header />

            <main>
                <h1 className="formTarefa__title">Edite sua Tarefa</h1>

                <div className="form">
                    <form>
                        <div className="form__title">
                            <label htmlFor="tarefa">Título da Tarefa</label>
                            <input type="text" id="tarefa" name="tarefa" value={task.value} onChange={task.onChange} />
                        </div>

                        <div className="form__description">
                            <label htmlFor="description__task">Descrição da Tarefa</label>
                            <textarea id="description__task" name="description__task" value={description.value} onChange={description.onChange}></textarea>
                        </div>

                        <div className="form__data">
                            <div className="form__dateStart">
                                <label htmlFor="data">Data de Início</label>
                                <input type="date" id="data" name="data" value={dateStart.value} onChange={dateStart.onChange} />
                            </div>
                            <div className="form__dateEnd">
                                <label htmlFor="data">Data de Fim</label>
                                <input type="date" id="data" name="data" value={dateEnd.value} onChange={dateEnd.onChange} />
                            </div>
                        </div>

                        <div className="form__time">
                            <label htmlFor="hora">Horario de Entrega</label>
                            <input type="time" id="hora" name="hora" value={time.value} onChange={time.onChange} />
                        </div>

                        <button className="btn__newTask" type="submit">Salvar Tarefa</button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}