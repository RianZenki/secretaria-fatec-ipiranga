import { useLocation, useNavigate } from 'react-router-dom'

import { Header } from '../../components/Header/Header'
import { useAuth } from '../../contexts/AuthContext'

export const Home = () => {

  const { aluno, handleLogout } = useAuth()

  return (
      <div>
          <Header aluno={aluno.nome} handleLogout={handleLogout} />


      </div>
  )
}