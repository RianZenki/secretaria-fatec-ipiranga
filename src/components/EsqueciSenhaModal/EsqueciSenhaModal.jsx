import { Formik, Form } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { EnvelopeSimple } from "phosphor-react";

import { BotaoCarregando } from "../../components/BotaoCarregando/BotaoCarregando";
import { TextInput } from "../TextInput/TextInput";
import { Alert } from "../../components/Alert/Alert";

import "../../global.css";
import styles from "./style.module.css";

import api from "../../services/api";

export const EsqueciSenhaModal = (props) => {
  const [loading, setLoading] = useState(false);
  const [resposta, setResposta] = useState({});
  const [mostrandoAlert, setMostrandoAlert] = useState(false);

  const validationEsqueciSenha = yup.object().shape({
    emailRec: yup
      .string()
      .email("* Digite um email válido")
      .required("* Campo obrigatório"),
  });

  const handleEsqueciSenha = async ({ emailRec }) => {
    setLoading(true);
    api.post("/auth/esqueci-senha", { emailRec }).then((response) => {
      if (response.status === 400) {
        setResposta({ ...response, tipo: "erro", texto: response.data.error });
        setMostrandoAlert(true);
        setTimeout(() => {
          setMostrandoAlert(false);
        }, 3000);
      } else if (response.status === 200) {
        setResposta({ ...response, tipo: "sucesso", texto: response.data.msg });
        setMostrandoAlert(true);
        setTimeout(() => {
          setMostrandoAlert(false);
        }, 3000);
      }
      setLoading(false);
    });
  };

  return (
    <>
      {mostrandoAlert && resposta && (
        <Alert tipo={resposta.tipo} texto={resposta.texto} />
      )}

      <div
        className={styles["fundo-container"]}
        onClick={() => props.setAberto(false)}
      />
      <div className={styles["modal-container"]}>
        <div className={styles["header"]}>
          <h1>Recuperar senha</h1>
          <p>
            Informe o e-mail cadastrado e será enviado o link para a criação de
            uma nova senha.
          </p>
        </div>

        <Formik
          initialValues={{
            emailRec: "",
          }}
          onSubmit={handleEsqueciSenha}
          validationSchema={validationEsqueciSenha}
        >
          <Form className={styles["form"]}>
            <TextInput
              titulo="Endereço de e-mail"
              nome="emailRec"
              placeholder="aluno@email.com"
              tipo="email"
            >
              <EnvelopeSimple color="#4D4D4D" size={24} />
            </TextInput>

            {loading ? (
              <BotaoCarregando className={styles["botao"]} />
            ) : (
              <button type="submit" className={styles["botao"]}>
                Recuperar senha
              </button>
            )}
          </Form>
        </Formik>
      </div>
    </>
  );
};
