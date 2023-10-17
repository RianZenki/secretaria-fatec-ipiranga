import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { FilePlus, Files, UserCircle, CaretDown, User, SignOut } from 'phosphor-react'

import '../../global.css'
import styles from './style.module.css'

import logo from '../../assets/logo.png'

export const Header = (props) => {

  const [visivel, setVisivel] = useState(false)

  function toggleMenu() {
    setVisivel(!visivel)
  }

  return (
    <header className={styles["header"]}>
      <div className={styles["logo-container"]}>
        <p>Logo</p>
      </div>

      <div className={styles["items-container"]}>
        <nav>
          <ul>
            <li>
              <NavLink to="/solicitacao" className={styles["link"]} >
                <FilePlus size={24} color={"#ffffff"} className={styles["icone"]} />
                Nova Solicitação
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className={styles["link"]} >
                <Files size={24} color={"#ffffff"} />
                Minhas solicitações
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles["aluno-container"]} onClick={toggleMenu}>
          <UserCircle size={32} color={"#ffffff"} />
          <p>{props.aluno}</p>
          <CaretDown size={16} weight="bold" color={"#ffffff"} />

          {visivel &&
            <div className={styles["dropdown-container"]}>
              <ul>
                <li>
                  <NavLink to="/perfil" className={styles["dropdown-link"]} >
                    <User size={20} color={"#ffffff"} />
                    Perfil
                  </NavLink>
                </li>
                <li onClick={props.handleLogout}>
                  <SignOut size={20} color={"#ffffff"} />
                  Sair
                </li>
              </ul>
            </div>
          }
        </div>
      </div>
    </header>
  )
}