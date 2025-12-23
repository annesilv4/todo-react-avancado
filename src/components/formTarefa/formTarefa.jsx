import "./formTarefa.css"
import Header from "../header/header";
import Footer from "../footer/footer";
import useInput from "../../hooks/useInput";
import { useTodo } from "../../hooks/useTodo";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function FormTarefa() {
    const { createTask, updateTask } = useTodo();
    const { user } = useAuth();
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

        const taskData = {
            title: task.value,
            description: description__task.value,
            dateStart: dateStart.value,
            dateEnd: dateEnd.value,
            time: time.value,
            status: editingTask?.status || "uncompleted",
            userId: user._id,
        };

        try {
            if (editingTask) {
                // Editar tarefa existente
                await updateTask(editingTask._id, taskData);
                console.log("Tarefa atualizada com sucesso");
            } else {
                // Criar nova tarefa
                await createTask(taskData);
                console.log("Tarefa criada com sucesso");
            }
            navigate("/tarefas");
        } catch (err) {
            console.error("Erro ao salvar tarefa:", err);
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
                            <input type="text" id="tarefa" name="tarefa" value={task.value} onChange={task.onChange} />
                        </div>

                        <div className="form__description">
                            <label htmlFor="description__task">Descrição da Tarefa</label>
                            <textarea id="description__task" name="description__task" value={description__task.value} onChange={description__task.onChange}></textarea>
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

                        <button className="btn__newTask" type="submit">{editingTask ? "Salvar Alterações" : "Criar Tarefa"}</button>
                    </form>
                </div>
            </main>

            <Footer />
        </>
    )
}