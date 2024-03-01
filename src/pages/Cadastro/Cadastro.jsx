import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { CaretLeft } from 'phosphor-react'
import { ClipLoader } from 'react-spinners'

import api from '../../services/api'
import { TextInput } from '../../components/TextInput/TextInput'

import '../../global.css'
import styles from './style.module.css'

export const Cadastro = () => {

  const [loading, setLoading] = useState(false)

  const handleClickCadastro = ({ nome, email, curso, turno, ra, senha }) => {
    setLoading(true)
    api.post('/auth/cadastro', {nome, email, curso, turno, ra, senha})
      .then(response => {
        alert(response.data.msg)
        if (response.status === 201) {
          setLoading(false)
        }
      })
  }

  const validationCadastro = yup.object().shape({
    nome: yup.string().required("* Campo obrigatório"),
    email: yup.string().email("Digite um email válido").required("* Campo obrigatório"),
    curso: yup.string().required("* Campo obrigatório"),
    turno: yup.string().required("* Campo obrigatório"),
    ra: yup.string().min(13, "* Requer 13 números").max(13, "* Requer 13 números").required("* Campo obrigatório"),
    senha: yup.string().min(8, "* Necessário pelo menos 8 caracteres").required('* Campo obrigatório'),
    confirmSenha: yup.string().oneOf([yup.ref('senha'), null], '* Senhas incompativeis').required("* Campo obrigatório")
  })

  return (
    <div className={styles["container"]}>
      <Formik 
        initialValues={{
          nome: '',
          email: '',
          curso: '',
          turno: '',
          ra: '',
          senha: '',
          confirmSenha: '',
        }}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >

        <div className={styles["form-container"]}>
          <Link to="/" style={{textDecoration: "none"}}>
            <span className={styles["voltar"]}>
              <CaretLeft size={24} />
              Voltar
            </span>
          </Link>
          <div className={styles["titulo-container"]}>
            <h1>Cadastro</h1>
            <h2>Crie seu cadastro para realizar suas solicitações</h2>
          </div>

          <Form> 
            <div className={styles["cadastro-container"]}>
              <div className={styles["wrap-input"]}>
                <TextInput titulo="Nome" nome="nome" placeholder="João Silva" />
                <TextInput titulo="Email" nome="email" placeholder="aluno@email.com" tipo="email" />
              </div>

              <div className={styles["wrap-input"]}>
                <div className={styles["input-group"]}>
                  <label htmlFor="curso">
                    <p>Curso</p>
                    <div className={styles["input-container"]}>                   
                    <Field 
                      className={styles["select"]}
                      name="curso" 
                      id="curso"
                      as="select"
                    >
                      <option value="default" hidden>Selecione um curso</option>
                      <option value="Análise e Desenvolvimento de Sistemas">Análise e Desenvolvimento de Sistemas</option>
                      <option value="Big Data para Negócios">Big Data para Negócios</option>
                      <option value="Eventos">Eventos</option>
                      <option value="Gestão Comercial">Gestão Comercial</option>
                      <option value="Recursos Humanos">Recursos Humanos</option>
                      <option value="Gestão Empresarial">Gestão Empresarial</option>
                    </Field>
                    <ErrorMessage
                      component="span"
                      name="curso"
                      className={styles["form-error"]}
                    />
                    </div>
                  </label>
                </div>

                <div className={styles["input-group"]}>
                  <label htmlFor="turno">
                    <p>Turno</p>
                    <div className={styles["input-container"]}>
                      <Field 
                        className={styles["select"]} 
                        name="turno" 
                        id="turno"
                        as="select"
                      >
                        <option value="default" hidden>Selecione o turno</option>
                        <option value="Matutino">Matutino</option>
                        <option value="Vespertino">Vespertino</option>
                        <option value="Noturno">Noturno</option>
                        <option value="EAD">EAD</option>
                      </Field>
                      <ErrorMessage
                        component="span"
                        name="turno"
                        className={styles["form-error"]}
                      />
                    </div>
                  </label>
                </div>

                <TextInput titulo="RA" nome="ra" max="13" placeholder="0000000000000" />
              </div>

              <div className={styles["wrap-input"]}>
                <TextInput titulo="Senha" nome="senha" placeholder="********" tipo="password" />
                <TextInput titulo="Confirmar Senha" nome="confirmSenha" placeholder="*******" tipo="password" />
              </div>

              <div className={styles["button-container"]}>
                {loading ?
                  <button type="submit">
                    <ClipLoader color="#FFF" size={20}/>
                    Enviando...
                  </button> :
                  <button type="submit">
                    Cadastre-se
                  </button>
                }
              </div>

            </div>
          </Form>
        </div>
      </Formik>
    </div>
  )
}