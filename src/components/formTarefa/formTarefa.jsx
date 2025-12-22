import "./formTarefa.css"
import Header from "../header/header";
import Footer from "../footer/footer";
import useInput from "../../hooks/useInput";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { updateTask } from "../../api/apiTarefa";

export default function FormTarefa({ onSubmit }) {
    const task = useInput("");
    const description__task = useInput("");
    const dateStart = useInput("");
    const dateEnd = useInput("");
    const time = useInput("");
    const navigate = useNavigate();
    const location = useLocation();
    const editingTask = location.state?.task;

    useEffect(() => {
        if (editingTask) {
            task.setValue(editingTask.title);
            description__task.setValue(editingTask.description);
            dateStart.setValue(editingTask.dateStart);
            dateEnd.setValue(editingTask.dateEnd);
            time.setValue(editingTask.time);
        }
    }, [editingTask]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("token");

        const newTask = {
            title: task.valor,
            description: description__task.valor,
            dateStart: dateStart.valor,
            dateEnd: dateEnd.valor,
            time: time.valor,
            status: editingTask?.status || "uncompleted",
            userId: userId,
        };

        if (editingTask) {
            try {
                await updateTask(editingTask._id, newTask);
                console.log("Tarefa atualizada com sucesso");
                navigate("/tarefas");
            } catch (err) {
                console.error("Erro ao atualizar tarefa:", err);
            }
        } else {
            onSubmit(newTask);
        }
    }


    return (
        <>
            <title>Todo List - {editingTask ? "Editar" : "Criar"} Tarefa</title>
            <Header />

            <main>
                <h1 className="formTarefa__title">{editingTask ? "Edite sua" : "Descreva sua"} Tarefa</h1>

                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <div className="form__title">
                            <label htmlFor="tarefa">Título da Tarefa</label>
                            <input type="text" id="tarefa" name="tarefa" value={task.valor} onChange={task.onChange} />
                        </div>

                        <div className="form__description">
                            <label htmlFor="description__task">Descrição da Tarefa</label>
                            <textarea id="description__task" name="description__task" value={description__task.valor} onChange={description__task.onChange}></textarea>
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

                        <button className="btn__newTask" type="submit">{editingTask ? "Salvar Alterações" : "Criar Tarefa"}</button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}