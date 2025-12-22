import "./filterTarefa.css";
import { useNavigate } from "react-router-dom";

export default function FiltrarTarefa({ onFilterChange, currentFilter }) {
    const navigate = useNavigate();

    return (
        <>
            <div className="user__filter">
                <p>Filtrar por:</p>
                <button onClick={() => onFilterChange('all')} value="all" className={`all__tasks ${currentFilter === 'all' ? 'active' : ''}`}>Todas as Tarefas</button>
                <button onClick={() => onFilterChange('completed')} value="completed" className={`completed__tasks ${currentFilter === 'completed' ? 'active' : ''}`}>Tarefas Concluídas</button>
                <button onClick={() => onFilterChange('uncompleted')} value="uncompleted" className={`uncompleted__tasks ${currentFilter === 'uncompleted' ? 'active' : ''}`}>Tarefas Pendentes</button>
            </div>

            <div className="user__newTarefa">
                <button className="btn__newTasks" onClick={() => navigate("/formTarefa")}>Adicionar Tarefa +</button>
            </div>
        </>
    )
}