import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import '../styles/cadastro.css'

export const Cadastro = () => {

    const handleClickCadastro = (valores) => {
        Axios.post('http://localhost:3001/cadastro', {
            nome: valores.nome,
            email: valores.email,
            curso: valores.curso,
            turno: valores.turno,
            ra: valores.ra,
            senha: valores.senha
        }).then(response => {
            alert(response.data.msg)
        })
    }

    const validationCadastro = yup.object().shape({
        nome: yup.string().required("Campo obrigatório"),
        email: yup.string().email("Digite um email válido").required("Campo obrigatório"),
        curso: yup.string().required("Campo obrigatório"),
        turno: yup.string().required("Campo obrigatório"),
        ra: yup.string().required("Campo obrigatório"),
        senha: yup.string().min(8, "A senha deve ter 8 caracteres").required('Campo obrigatório'),
        confirmSenha: yup.string().oneOf([yup.ref('senha'), null], 'As senha não são iguais').required("Campo obrigatório")
    })

    return (
        <div className="container">
            <header></header>
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
                <div className="form-container">
                    <Form> 
                        <span className="form-titulo">Cadastre-se</span>

                        <div className="cadastro-container">

                            <div className="wrap-input">
                                <div className="input-group">
                                    <label htmlFor="nome">Nome</label>
                                    <Field 
                                        className="input"
                                        name="nome" 
                                        id="nome"
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="nome"
                                        className="form-error"
                                    />
                                </div>
                            </div>

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
                                    <label htmlFor="curso">Curso</label>
                                    <Field 
                                        className="select"
                                        name="curso" 
                                        id="curso"
                                        as="select"
                                    >
                                        <option value="default" hidden>Selecione um curso</option>
                                        <option value="ads">Análise e Desenvolvimento de Sistemas</option>
                                        <option value="big data">Big Data para Negócios</option>
                                        <option value="eventos">Eventos</option>
                                        <option value="gestao comercial">Gestão Comercial</option>
                                        <option value="recursos humanos">Recursos Humanos</option>
                                        <option value="gestao empresarial">Gestão Empresarial</option>
                                    </Field>
                                    <ErrorMessage
                                        component="span"
                                        name="curso"
                                        className="form-error"
                                    />
                                </div>
                            </div>

                            <div className="wrap-input">
                                <div className="input-group">
                                    <label htmlFor="turno">Turno</label>
                                    <Field 
                                        className="select" 
                                        name="turno" 
                                        id="turno"
                                        as="select"
                                        >
                                        <option value="default" hidden>Selecione o turno</option>
                                        <option value="matutino">Matutino</option>
                                        <option value="vespertino">Vespertino</option>
                                        <option value="noturno">Noturno</option>
                                        <option value="ead">EAD - Ensino a Distância</option>
                                    </Field>
                                    <ErrorMessage
                                        component="span"
                                        name="turno"
                                        className="form-error"
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="ra">RA</label>
                                    <Field 
                                        className="input" 
                                        name="ra" 
                                        id="ra" 
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="ra"
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
                                <div className="input-group">
                                    <label htmlFor="confirmSenha">Confirmar Senha</label>
                                    <Field 
                                        className="input" 
                                        name="confirmSenha" 
                                        id="confirmSenha"
                                        type="password"
                                    />
                                    <ErrorMessage
                                        component="span"
                                        name="confirmSenha"
                                        className="form-error"
                                    />
                                </div>
                            </div>

                            <div className="wrap-buttons">
                                <span>Já possui cadastro? <Link to="/login">Entrar</Link> </span>
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