import { createContext, useState, useCallback, useEffect } from "react";
import { getTask, createTask, updateTask, deleteTask } from "../api/apiTarefa";

// 1. Criar o contexto
export const TodoContext = createContext();

// 2. Criar o Provider (componente que envolve a app)
export function TodoProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Buscar todas as tarefas do usuário logado
    const fetchTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const userId = localStorage.getItem("token");
            if (!userId) {
                setTasks([]);
                return;
            }

            const response = await getTask();
            const userTasks = response.filter(task => task.userId === userId);
            setTasks(userTasks);
        } catch (err) {
            console.error("[ ERROR FETCH TASKS ]", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Criar nova tarefa
    const handleCreateTask = useCallback(async (taskData) => {
        setLoading(true);
        setError(null);
        try {
            const newTask = await createTask(taskData);
            setTasks(prev => [...prev, newTask]);
            return newTask;
        } catch (err) {
            console.error("[ ERROR CREATE TASK ]", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Atualizar tarefa
    const handleUpdateTask = useCallback(async (taskId, taskData) => {
        setLoading(true);
        setError(null);
        try {
            await updateTask(taskId, taskData);
            setTasks(prev =>
                prev.map(task =>
                    task._id === taskId ? { ...task, ...taskData } : task
                )
            );
        } catch (err) {
            console.error("[ ERROR UPDATE TASK ]", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Deletar tarefa
    const handleDeleteTask = useCallback(async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            await deleteTask(taskId);
            setTasks(prev => prev.filter(task => task._id !== taskId));
        } catch (err) {
            console.error("[ ERROR DELETE TASK ]", err);
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    // Buscar tarefas ao montar o provider (se houver usuário logado)
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchTasks();
        }
    }, [fetchTasks]);

    // Objeto com valores e funções do contexto
    const value = {
        tasks,
        loading,
        error,
        fetchTasks,
        createTask: handleCreateTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
    };

    return (
        <TodoContext.Provider value={value}>
            {children}
        </TodoContext.Provider>
    );
}
