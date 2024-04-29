import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import * as yup from "yup";

import { EnvelopeSimple, LockKey } from "phosphor-react";
import { ClipLoader } from "react-spinners";

import { useAuth } from "../../contexts/AuthContext";
import { EsqueciSenhaModal } from "../../components/EsqueciSenhaModal/EsqueciSenhaModal";
import { Alert } from "../../components/Alert/Alert";

import "../../global.css";
import styles from "./style.module.css";

export const Login = () => {
  const { handleLogin } = useAuth();

  const [loading, setLoading] = useState(false);
  const [aberto, setAberto] = useState(false);
  const [mostrandoAlert, setMostrandoAlert] = useState(false);
  const [dados, setDados] = useState({});

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("* Digite um email válido")
      .required("* Campo obrigatório"),
    senha: yup
      .string()
      .min(8, "* Necessário pelo menos 8 caracteres")
      .required("* Campo obrigatório"),
  });

  let timeoutId = null;

  useEffect(() => {
    if (dados.length > 0) {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    }

    timeoutId = setTimeout(() => {
      setMostrandoAlert(false);
    }, 3000);

    return () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, [dados]);

  return (
    <div className={`${styles.container} bg-cyan-700`}>
      {mostrandoAlert && <Alert tipo={dados.tipo} texto={dados.error} />}

      <Formik
        initialValues={{
          email: "",
          senha: "",
        }}
        onSubmit={(values) =>
          handleLogin(values, setLoading, setMostrandoAlert, setDados)
        }
        validationSchema={validationLogin}
      >
        <div className={styles["login-container"]}>
          <header>
            <p>Logo</p>
            <h1>Nome do projeto</h1>
            <h2>Realize suas solicitações aqui!</h2>
          </header>

          <Form>
            <div className={styles["login-form-container"]}>
              <div className={styles["wrap-input"]}>
                <div className={styles["input-group"]}>
                  <label htmlFor="email">
                    <p>Endereço de e-mail</p>
                    <div className={styles["input-container"]}>
                      <EnvelopeSimple color="#4D4D4D" size={24} />
                      <Field
                        className={styles["input"]}
                        name="email"
                        id="email"
                        placeholder="aluno@email.com"
                      />
                      <ErrorMessage
                        component="span"
                        name="email"
                        className={styles["form-error"]}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className={styles["wrap-input"]}>
                <div className={styles["input-group"]}>
                  <label htmlFor="senha">
                    <p>Sua senha</p>
                    <div className={styles["input-container"]}>
                      <LockKey color="#4D4D4D" size={24} />
                      <Field
                        className={styles["input"]}
                        name="senha"
                        id="senha"
                        type="password"
                        placeholder="********"
                      />
                      <ErrorMessage
                        component="span"
                        name="senha"
                        className={styles["form-error"]}
                      />
                    </div>
                  </label>
                </div>
              </div>

              <div className={styles["wrap-buttons"]}>
                <div className={styles["button-container"]}>
                  {loading ? (
                    <button type="submit">
                      <ClipLoader color="#FFF" size={20} />
                      Entrando...
                    </button>
                  ) : (
                    <button type="submit">Entrar no sistema</button>
                  )}
                </div>
              </div>
            </div>
          </Form>

          <footer className={styles["footer"]}>
            <p className={styles["link"]} onClick={() => setAberto(true)}>
              Esqueceu a senha?
            </p>
            <p>
              <Link to="/cadastro">
                Não possui cadastro no sitema? Cadastre-se
              </Link>
            </p>
          </footer>
        </div>
      </Formik>

      {aberto && <EsqueciSenhaModal setAberto={setAberto} />}
    </div>
  );
};
