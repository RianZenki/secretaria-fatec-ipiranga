import { Route, Routes } from 'react-router-dom';

import { Cadastro } from './pages/Cadastro'
import { Login } from './pages/Login'
import { Aluno } from './pages/Aluno'

function App() {
  return (
      <Routes>
        <Route path="/" element={<Cadastro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aluno" element={<Aluno />} />
      </Routes>
  );
}

export default App;
