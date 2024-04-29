import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UserCircle, CaretDown, User, SignOut } from "phosphor-react";

import "../../global.css";
import styles from "./style.module.css";

import logo from "../../assets/logo.png";

export const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen(!isOpen);
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
              <NavLink to="/solicitacao" className={styles["link"]}>
                Nova Solicitação
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className={styles["link"]}>
                Minhas solicitações
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className={styles["aluno-container"]} onClick={toggleMenu}>
          <UserCircle size={32} color={"#ffffff"} />
          <p>{props.aluno}</p>
          <CaretDown size={16} weight="bold" color={"#ffffff"} />

          {isOpen && (
            <div className={styles["dropdown-container"]}>
              <ul>
                <li>
                  <NavLink to="/perfil" className={styles["dropdown-link"]}>
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
          )}
        </div>
      </div>
    </header>
  );
};
