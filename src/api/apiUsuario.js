import axios from "axios";

const apiUser = "https://crudcrud.com/api/892eaf519f03449eac8a3eb65d83c07f/user";

export const getUser = async () => {
    try {
        const response = await axios.get(apiUser);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const users = await getUser();
        const userFound = users.find(
            (u) => u.email === email && u.password === password
        );

        return userFound || null;
    } catch (error) {
        console.log("Error logging user:", error);
        throw error;
    }
}


export const createUser = async (userData) => {
    try {
        const response = await axios.post(apiUser, userData);
        return response.data;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};


export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${apiUser}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};


export const updateUser = async (userId, userData) => {
    try {
        const response = await axios.put(`${apiUser}/${userId}`, userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};

export const logoutUser = () => {
    try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.href = "/";
        return true;
    } catch (error) {
        console.error("Error logging out user:", error);
        throw error;
    }
};
