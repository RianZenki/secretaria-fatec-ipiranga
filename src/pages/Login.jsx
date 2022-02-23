import { Formik, Form, Field, ErrorMessage }  from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import Axios from 'axios'

import '../styles/login.css'

export const Login = () => {

    const navigate = useNavigate()

    const handleClickLogin = (valores) => {
        Axios.post('http://localhost:3001/login', {
            email: valores.email,
            senha: valores.senha
        }).then(response => {
            alert(response.data.msg)
            if (response.data.email)
                navigate("/aluno", { state: { email: response.data.email } })
        })
    }

    const validationLogin = yup.object().shape({
        email: yup.string().email("Digite um email válido").required("Campo obrigatório"),
        senha: yup.string().min(8, "A senha deve ter 8 caracteres").required('Campo obrigatório'),
    })

    return (
        <div className="container">
            <header></header>
            <Formik 
                initialValues={{
                    email: '',
                    senha: ''
                }}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <div className="form-container">
                    <Form> 
                        <span className="form-titulo">Login</span>

                        <div className="login-container">

                            <div className="wrap-input">
                                <div className="input-group">
                                    <label htmlFor="email">Email</label>
                                    <Field 
                                        className="input"
                                        name="email"
                                        id="email"
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="email"
                                        className="form-error"
                                    />
                                </div>
                            </div>
                            <div className="wrap-input">
                                <div className="input-group">
                                    <label htmlFor="senha">Senha</label>
                                    <Field 
                                        className="input" 
                                        name="senha" 
                                        id="senha"
                                        type="password"
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="senha"
                                        className="form-error"
                                    />
                                </div>
                            </div>

                            <div className="wrap-buttons">
                                <span>Não possui cadastro? <Link to="/">Cadastre-se</Link> </span>
                                <div className="button-container">
                                    <button type="submit">Cadastrar</button>
                                </div>
                            </div>

                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    )
}