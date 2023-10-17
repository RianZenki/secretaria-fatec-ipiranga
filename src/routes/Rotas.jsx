import { Route, Routes } from 'react-router-dom';

import { Cadastro } from '../pages/Cadastro/Cadastro'
import { Login } from '../pages/Login/Login'
import { Home } from '../pages/Home/Home'
import { Perfil } from '../pages/Perfil/Perfil'
import { NovaSenha } from '../pages/NovaSenha/NovaSenha'
import { NovaSolicitacao } from '../pages/NovaSolicitacao/NovaSolicitacao';

export const Rotas = () => {
    return (
        <Routes>
            {/* Rotas publicas */}
            <Route path="/"  element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* Rotas privadas */}
            <Route path="/home"  element={<Home />} />
            <Route path="/perfil"  element={<Perfil />} />
            <Route path="/nova-senha" element={<NovaSenha />} />
            <Route path="/nova-solicitacao" element={<NovaSolicitacao />} />
        </Routes>
    )
}