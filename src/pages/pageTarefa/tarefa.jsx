import "./tarefa.css";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FiltrarTarefa from "../../components/filterTarefa/filterTarefa";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodo } from "../../hooks/useTodo";
import { useAuth } from "../../hooks/useAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { faTableColumns } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Tarefa() {
     const { tasks, updateTask, deleteTask } = useTodo();
     const { isAuthenticated } = useAuth();
     const [filterStatus, setFilterStatus] = useState('all');
     const [viewFormat, setViewFormat] = useState('list');
     const navigate = useNavigate();

     const filteredTasks = useMemo(() => {
         if (filterStatus === 'all') {
             return tasks;
         } else if (filterStatus === 'completed') {
             return tasks.filter(task => task.status === 'completed');
         } else if (filterStatus === 'uncompleted') {
             return tasks.filter(task => task.status === 'uncompleted');
         }
     }, [tasks, filterStatus]);

    const monthNames = useMemo(() => [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ], []);

    const handleCheckbox = async (taskId, task) => {
        const newStatus = task.status === 'completed' ? 'uncompleted' : 'completed';

        // Atualiza no banco de dados
        try {
            const updateData = {
                title: task.title,
                description: task.description,
                dateStart: task.dateStart,
                dateEnd: task.dateEnd,
                time: task.time,
                userId: task.userId,
                status: newStatus
            };

            await updateTask(taskId, updateData);
            console.log("Tarefa atualizada com sucesso");
        } catch (err) {
            console.error("[ ERROR UPDATE TASK ]", err);
        }
    }

    const handleDeleteTask = async (taskId) => {
        if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
            try {
                await deleteTask(taskId);
                console.log("Tarefa excluída com sucesso");
            } catch (err) {
                console.error("[ ERROR DELETE TASK ]", err);
            }
        }
    }

    const handleEditTask = (task) => {
        navigate(`/formTarefa`, { state: { task } });
    }

    const handleFormatDate = (date) => {
        if (!date) return '';

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
                            {filteredTasks.length == 0 ? (
                                <p className="user__noTasks">Nenhuma tarefa encontrada</p>
                            ) : (
                                filteredTasks.map(task => (
                                    <div key={task._id} className={`user__task ${task.status === 'completed' ? 'user__task--completed' : ''}`}>
                                        <div className="user__taskCheckbox">
                                            <input
                                                type="checkbox"
                                                onChange={() => handleCheckbox(task._id, task)}
                                                checked={task.status === 'completed'}
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
                                        <div className="user__taskActions">
                                            <button 
                                                className="btn__edit" 
                                                onClick={() => handleEditTask(task)}
                                                title="Editar tarefa"
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                            <button 
                                                className="btn__delete" 
                                                onClick={() => handleDeleteTask(task._id)}
                                                title="Excluir tarefa"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
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