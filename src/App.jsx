import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoadingProvider } from './context/LoadingContext';
import Tarefa from './pages/pageTarefa/tarefa';
import PageLogin from './pages/pageLogin/pageLogin';
import FormNewUser from './components/formNewUser/formNewUser';
import FormTarefa from './components/formTarefa/formTarefa';

function App() {
    return (
        <LoadingProvider>
            <BrowserRouter>
                <Routes>

                    {/* Rota de Login */}
                    <Route path="/" element={<PageLogin />} />

                    {/* Rota da Home (Tarefas) */}
                    <Route path='/tarefas' element={<Tarefa />} />

                    {/* Rota de Novo Usuário */}
                    <Route path='/formNewUser' element={<FormNewUser />} />

                    {/* Rota de Criar/Editar Tarefa */}
                    <Route path='/formTarefa' element={<FormTarefa />} />

                </Routes>
            </BrowserRouter>
        </LoadingProvider>
    );
}

export default App;
