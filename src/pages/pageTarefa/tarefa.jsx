import "./tarefa.css";
import { Link } from "react-router-dom";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import FiltrarTarefa from "../../components/filterTarefa/filterTarefa";

export default function Tarefa() {
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
                    <p className="user__noTasks">Nenhuma tarefa cadastrada</p>
                </div>
            </main>

            <Footer />
        </>
    )
}