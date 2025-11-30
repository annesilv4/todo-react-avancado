import "./filterTarefa.css";

export default function FiltrarTarefa() {
    return (
        <>
            <div className="user__filter">
                <p>Filtrar por:</p>
                <button value="all" className="all__tasks">Todas as Tarefas</button>
                <button value="completed" className="completed__tasks">Tarefas Concluídas</button>
                <button value="uncompleted" className="uncompleted__tasks">Tarefas Pendentes</button>
            </div>

            <div className="user__newTarefa">
                <button className="btn__newTasks">Adicionar Tarefa +</button>
            </div>
        </>
    )
}