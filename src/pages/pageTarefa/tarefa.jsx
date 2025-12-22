import "./tarefa.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FiltrarTarefa from "../../components/filterTarefa/filterTarefa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTask, updateTask } from "../../api/apiTarefa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

export default function Tarefa() {
    const [tasks, setTasks] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [checkedTasks, setCheckedTasks] = useState({});
    const [filterStatus, setFilterStatus] = useState('all');
    const [viewFormat, setViewFormat] = useState('list');
    const navigate = useNavigate();
    // const [loading, setLoading] = useState(true);

    const filterTasks = () => {
        if (filterStatus === 'all') {
            return tasks;
        } else if (filterStatus === 'completed') {
            return tasks.filter(task => checkedTasks[task._id] === true);
        } else if (filterStatus === 'uncompleted') {
            return tasks.filter(task => checkedTasks[task._id] !== true);
        }
    }

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

    const handleCheckbox = async (taskId, task) => {
        const newStatus = !checkedTasks[taskId];

        // Atualiza estado local
        setCheckedTasks(prev => ({
            ...prev,
            [taskId]: newStatus
        }));

        // Atualiza no banco de dados
        try {
            const updateData = {
                title: task.title,
                description: task.description,
                dateStart: task.dateStart,
                dateEnd: task.dateEnd,
                time: task.time,
                userId: task.userId,
                status: newStatus ? "completed" : "uncompleted"
            };

            await updateTask(taskId, updateData);
            console.log("Tarefa atualizada com sucesso");
        } catch (err) {
            console.error("[ ERROR UPDATE TASK ]", err);
            // Desfaz a mudança em caso de erro
            setCheckedTasks(prev => ({
                ...prev,
                [taskId]: !newStatus
            }));
        }
    }

    const handleFormatDate = (date) => {
        if (!date) return '';
        const monthNames = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        // Se a data está em formato YYYY-MM-DD, formata para DD de mês de YYYY
        if (date.includes('-')) {
            const [year, month, day] = date.split('-');
            const monthName = monthNames[parseInt(month) - 1];
            return `${day} de ${monthName} de ${year}`;
        }
        return date;
    }

    return (
        <>
            <title>Todo List - Tarefas</title>

            <Header />

            <main className="user__tarefas">
                {isAuthenticated ? (
                    <>
                        <h1 className="user__title">Suas Tarefas</h1>
                        <div className="user__action">
                            <FiltrarTarefa onFilterChange={setFilterStatus} currentFilter={filterStatus} />
                        </div>

                        <div className="format__task">
                            <button 
                                className={`tasks__list ${viewFormat === 'list' ? 'active' : ''}`}
                                onClick={() => setViewFormat('list')}
                            >
                                <FontAwesomeIcon icon={faList} />
                            </button>
                            <button 
                                className={`tasks__columns ${viewFormat === 'columns' ? 'active' : ''}`}
                                onClick={() => setViewFormat('columns')}
                            >
                                <FontAwesomeIcon icon={faTableColumns} />
                            </button>
                        </div>

                        <div className={`user__tasks user__tasks--${viewFormat}`}>
                            {filterTasks().length == 0 ? (
                                <p className="user__noTasks">Nenhuma tarefa encontrada</p>
                            ) : (
                                filterTasks().map(task => (
                                    <div key={task._id} className={`user__task ${checkedTasks[task._id] ? 'user__task--completed' : ''}`}>
                                        <div className="user__taskCheckbox">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckbox(task._id, task)}
                                                checked={checkedTasks[task._id] || false}
                                            />
                                        </div>
                                        <div className="user__taskContent">
                                            <h2 className="task__title">{task.title}</h2>
                                            <p className="task__description">{task.description}</p>
                                            {(task.dateStart || task.dateEnd) && (
                                                <div className="task__dates">
                                                    <FontAwesomeIcon icon={faCalendar} />
                                                    <small className="task__dateStart">{handleFormatDate(task.dateStart)}</small>
                                                    <FontAwesomeIcon icon={faArrowRight} />
                                                    <small className="task__dateEnd">{handleFormatDate(task.dateEnd)}</small>
                                                </div>
                                            )}
                                            {task.time && (
                                                <div className="task__time"><FontAwesomeIcon icon={faClock} /> {task.time}</div>
                                            )}
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