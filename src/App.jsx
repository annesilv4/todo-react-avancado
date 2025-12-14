import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Tarefa from './pages/pageTarefa/tarefa';
import PageLogin from './pages/pageLogin/pageLogin';
import FormNewUser from './components/formNewUser/formNewUser';
import FormTarefa from './components/formTarefa/formTarefa';
import { createTask } from './api/apiTarefa';


function App() {
    // FUNCTION PARA CRIAR UMA NOVA TAREFA
    const handleCreateTask = async (taskData) => {
        try {
            await createTask(taskData);
            window.location.href = "/";
        } catch (err) {
            console.error("Error creating task:", err);
        }
    };

    return (
        <BrowserRouter>
            <Routes>

                {/* Rota da Home */}
                <Route path="/" element={<Tarefa />} />

                {/* Rota de Login */}
                <Route path='/login' element={<PageLogin />} />

                {/* Rota de Novo Usuário */}
                <Route path='/formNewUser' element={<FormNewUser />} />

                {/* Rota de Fazer Tarefa */}
                <Route path='/formTarefa' element={<FormTarefa onSubmit={handleCreateTask} />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;