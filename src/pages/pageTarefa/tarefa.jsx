import "./tarefa.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FiltrarTarefa from "../../components/filterTarefa/filterTarefa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTask } from "../../api/apiTarefa";

export default function Tarefa() {
    const [tasks, setTasks] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Verifica se o usuário está logado
        const token = localStorage.getItem("token");
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        setIsAuthenticated(true);

        const fetchTarefas = async () => {
            try {
                const request = await getTask();
                // Filtra tarefas do usuário logado
                const userId = localStorage.getItem("token");
                const userTasks = request.filter(task => task.userId === userId);
                setTasks(userTasks);
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
                {isAuthenticated ? (
                    <>
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
                                        <div className="user__taskContent">
                                            <h2 className="task__title">{task.title}</h2>
                                            <p className="task__description">{task.description}</p>
                                            <small className="task__dateStart">{task.dateStart}</small>
                                            <small className="task__dateEnd">{task.dateEnd}</small>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </>
                ) : (
                    <p className="user__noTasks">Para ter acesso as suas tarefas. Realize o seu login</p>
                )}
            </main>

            <Footer />
        </>
    )
}