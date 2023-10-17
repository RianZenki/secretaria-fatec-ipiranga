import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { LockKey } from 'phosphor-react'

import { TextInput } from '../../components/TextInput/TextInput'
import { BotaoCarregando } from '../../components/BotaoCarregando/BotaoCarregando'

import '../../global.css'
import styles from './style.module.css'

import api from '../../services/api'

export const NovaSenha = () => {
  const [loading, setLoading] = useState(false)

  const validationAlterarSenha = yup.object().shape({
    senha: yup.string().min(8, "* Necessário pelo menos 8 caracteres").required('* Campo obrigatório'),
    senhaConf: yup.string().oneOf([yup.ref('senha'), null], '* Senhas incompativeis').required("* Campo obrigatório")
  })

  const handleAlterarSenha = ({ senha }) => {
    setLoading(true)
    api.post('/auth/alterar-senha', {senha})
      .then(response => {
        console.log(response.data)
        setLoading(false)
      })
  }

  return(
    <div className={styles["container"]}>
      <div className={styles["form-container"]}>
        <header>
          <h1>Alterar senha</h1>
          <p>Realize o cadastro de uma nova senha</p>
        </header>

        <Formik
          initialValues={{
            senha: '',
            senhaConf: ''
          }}
          onSubmit={handleAlterarSenha}
          validationSchema={validationAlterarSenha}
        >
          <Form className={styles["form"]}>
            <TextInput titulo="Nova senha" nome="senha" placeholder="********" tipo="password">
              <LockKey color="#4D4D4D" size={24} />
            </TextInput>
            <TextInput titulo="Confirmar senha" nome="senhaConf" placeholder="********" tipo="password">
              <LockKey color="#4D4D4D" size={24} />
            </TextInput>

            {loading ?
              <BotaoCarregando className={styles["botao"]} />
            :
              <button className={styles["botao"]}>Alterar Senha</button>
            }
          </Form>
        </Formik>
      </div>
    </div>
  )
}