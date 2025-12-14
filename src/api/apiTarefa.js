import axios from "axios";

const apiTarefa = "https://crudcrud.com/api/9bfe9fa6d1d3414e9bb51f67cf40a9cd/task";

export const getTask = async () => {
    try {
        const response = await axios.get(apiTarefa);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

export const createTask = async (taskData) => {
    try {
        const response = await axios.post(apiTarefa, taskData);
        return response.data;
    } catch (error) {
        console.error("Error creating task:", error);
        throw error;
    }
};

export const deleteTask = async (taskId) => {
    try {
        const response = await axios.delete(`${apiTarefa}/${taskId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const updateTask = async (taskId, taskData) => {
    try {
        const response = await axios.put(`${apiTarefa}/${taskId}`, taskData);
        return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};
