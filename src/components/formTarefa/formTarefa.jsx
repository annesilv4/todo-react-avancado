import "./formTarefa.css"
import Header from "../header/header";
import Footer from "../footer/footer";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";

export default function FormTarefa({ onSubmit }) {
    const task = useInput("");
    const description = useInput("");
    const dateStart = useInput("");
    const dateEnd = useInput("");
    const time = useInput("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const newTask = {
            title: task.valor,
            description: description.valor,
            dateStart: dateStart.valor,
            dateEnd: dateEnd.valor,
            time: time.valor,
            status: "uncompleted",
        };

        onSubmit(newTask);
    }

    const navigate = useNavigate();


    return (
        <>
            <title>Todo List - Criando Tarefa</title>
            <Header />

            <main>
                <h1 className="formTarefa__title">Descreva sua Tarefa</h1>

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="form__title">
                            <label htmlFor="tarefa">Título da Tarefa</label>
                            <input type="text" id="tarefa" name="tarefa" value={task.valor} onChange={task.onChange} />
                        </div>

                        <div className="form__description">
                            <label htmlFor="description__task">Descrição da Tarefa</label>
                            <textarea id="description__task" name="description__task" value={description.valor} onChange={description.onChange}></textarea>
                        </div>

                        <div className="form__data">
                            <div className="form__dateStart">
                                <label htmlFor="data">Data de Início</label>
                                <input type="date" id="data" name="data" value={dateStart.valor} onChange={dateStart.onChange} />
                            </div>
                            <div className="form__dateEnd">
                                <label htmlFor="data">Data de Fim</label>
                                <input type="date" id="data" name="data" value={dateEnd.valor} onChange={dateEnd.onChange} />
                            </div>
                        </div>

                        <div className="form__time">
                            <label htmlFor="hora">Horario de Entrega</label>
                            <input type="time" id="hora" name="hora" value={time.valor} onChange={time.onChange} />
                        </div>

                        <button className="btn__newTask" type="submit" onClick={() => navigate("/")}>Criar Tarefa</button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}