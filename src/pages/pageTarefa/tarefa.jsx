import "./tarefa.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FiltrarTarefa from "../../components/filterTarefa/filterTarefa";
import { useState, useEffect } from "react";
import { getTask } from "../../api/apiTarefa";

export default function Tarefa() {
    const [tasks, setTasks] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTarefas = async () => {
            try {
                const request = await getTask();
                setTasks(request);
            } catch (err) {
                console.error("[ ERROR TASKS ]", err);
            } finally {
                // setLoading(false);
            }
        };
        fetchTarefas();
    }, [])

    return (
        <>
            <title>Todo List - Tarefas</title>

            <Header />

            <main className="user__tarefas">
                <h1 className="user__title">Suas Tarefas</h1>
                <div className="user__action">
                    <FiltrarTarefa />
                </div>

                <div className="user__tasks">
                    {tasks.length == 0 ? (
                        <p className="user__noTasks">Nenhuma tarefa encontrada</p>
                    ) : (
                        tasks.map(task => (
                            <div key={task._id} className="user__task">
                                <div className="user__taskCheckbox">
                                    <input type="checkbox" />
                                </div>
                                <div>
                                    <h2>{task.title}</h2>
                                    <p>{task.description}</p>
                                    <small>{task.dateStart}</small>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <Footer />
        </>
    )
}