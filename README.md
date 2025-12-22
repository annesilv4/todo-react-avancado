# 📝 Todo List - React Avançado

Uma aplicação moderna de gerenciamento de tarefas desenvolvida com **React 19**, demonstrando conceitos avançados de desenvolvimento frontend.

## ✨ Características

- ✅ Criar, editar e deletar tarefas
- 🎯 Interface intuitiva e responsiva
- 🔄 Sincronização com API em tempo real
- 🎨 Design limpo e moderno
- 📱 Totalmente responsivo

## 🛠️ Tecnologias

| Categoria     | Tecnologias                                      |
| ------------- | ------------------------------------------------ |
| **Frontend**  | React 19.2, React Router DOM 7.9                 |
| **HTTP**      | Axios 1.13                                       |
| **UI**        | FontAwesome 3.1 (ícones), React Helmet 6.1 (SEO) |
| **Build**     | Vite 7.2                                         |
| **Qualidade** | ESLint 9.39                                      |
| **API**       | CRUCRUD (REST)                                   |

## 📋 Pré-requisitos

- **Node.js** ≥ 14 ou superior
- **npm** (incluído no Node.js)

Verifique a instalação:

```bash
node --version
npm --version
```

## 🚀 Início Rápido

### 1. Clone o repositório

```bash
git clone https://github.com/annesilv4/todo-react-avancado.git
cd todo-list
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

A aplicação abrirá em `http://localhost:5173`

## 📦 Scripts Disponíveis

| Comando           | Descrição                                           |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento com hot reload |
| `npm run build`   | Cria uma versão otimizada para produção             |
| `npm run preview` | Visualiza a build de produção localmente            |
| `npm run lint`    | Verifica a qualidade do código                      |

## 📁 Estrutura do Projeto

```
src/
├── api/              # Configurações e chamadas de API
├── assets/           # Imagens e recursos estáticos
├── components/       # Componentes reutilizáveis
├── hooks/            # Custom React Hooks
├── pages/            # Páginas da aplicação
├── App.jsx           # Componente raiz
├── App.css           # Estilos globais
├── main.jsx          # Ponto de entrada
└── index.css         # Estilos globais
```

## 🔌 API Integration

A aplicação utiliza a **CRUCRUD API** para operações de CRUD:

- **Documentação**: [crucrud.io](https://crucrud.io/)
- **Recursos**: Endpoints para gerenciar tarefas
- **Configuração**: Localizada em `src/api/`

## 📚 Padrões Utilizados

- ✅ Componentes funcionais com Hooks
- ✅ React Router para navegação
- ✅ Axios para requisições HTTP
- ✅ React Helmet para SEO
- ✅ ESLint para qualidade de código

## 📄 Licença

Projeto educacional - EBAC

## 👤 Autor

**Anne Carolayne** - Aluna do Curso Desenvolvimento Full Stack em Python
