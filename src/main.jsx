import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './context/UserContext'
import { TodoProvider } from './context/TodoContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <TodoProvider>
        <App />
      </TodoProvider>
    </UserProvider>
  </StrictMode>
)
