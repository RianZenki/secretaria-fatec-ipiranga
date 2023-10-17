import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'

import api from '../../services/api'
import { Header } from '../../components/Header/Header'
import { useAuth } from '../../contexts/AuthContext'

import '../../global.css'
import styles from './style.module.css'

export const Perfil = () => {
    
    const { aluno, handleLogout } = useAuth()

    const navigate = useNavigate()

    const [dadosAluno, setDadosAluno] = useState({})
    const [dadosInicial, setDadosInicial] = useState({
        idAluno: '',
        nome: '',
        email: '',
        curso: '',
        turno: '',
        ra: ''
    })

    const handleAtualizaDados = (valores) => {
        api.put('/aluno/alterar-dados-aluno', {
            idAluno: aluno.idAluno,
            nome: valores.nome,
            email: valores.email,
            curso: valores.curso,
            turno: valores.turno,
            ra: valores.ra,  
        }).then(response => {
            alert(response.data.msg)
        })            
    }

    const handleDeletarDados = () => {
        console.log(aluno.idAluno)
        api.delete(`/deletar-aluno/${aluno.idAluno}`)
        .then(response => {
            alert(response.data.msg)
            if(response.status === 200) {
                navigate("/")
            }
        })
    }

    const validationCadastro = yup.object().shape({
        nome: yup.string().required("* Campo obrigatório"),
        email: yup.string().email("Digite um email válido").required("* Campo obrigatório"),
        curso: yup.string().required("* Campo obrigatório"),
        turno: yup.string().required("* Campo obrigatório"),
        ra: yup.string().required("* Campo obrigatório"),
    })

    useEffect(() => {
        api.get(`/aluno/consultar-dados-aaaa`)
        .then(response => {
            setDadosAluno(response.data[0])
        })
    },[])


    // useEffect(() => {
    //     const novosDados = {
    //         idAluno: dadosAluno.idAluno,
    //         nome: dadosAluno.nome,
    //         email: dadosAluno.email,
    //         curso: dadosAluno.curso,
    //         turno: dadosAluno.turno,
    //         ra: dadosAluno.ra
    //     }
    //     setDadosInicial(novosDados)
    // }, [dadosAluno])

    const initialValues = {
        nome: dadosAluno.nome,
        email: dadosAluno.email,
        curso: dadosAluno.curso,
        turno: dadosAluno.turno,
        ra: dadosAluno.ra
    }

    return (
        <div className='perfil-container'>
            <Header items={["Nova solicitação", "Consultar Solicitações", "Home"]} usuario={aluno.nome} />

            <Formik 
                initialValues={initialValues}
                onSubmit={handleAtualizaDados}
                validationSchema={validationCadastro}
                enableReinitialize
            >
                <div className="form-container">
                    <Form> 
                        <span className="form-titulo">Dados do aluno</span>

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

                            {/* <div className="wrap-input">
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
                            </div> */}

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
                                            <option value="Matutino">Matutino</option>
                                            <option value="Vespertino">Vespertino</option>
                                            <option value="Noturno">Noturno</option>
                                            <option value="EAD - Ensino a Distância">EAD - Ensino a Distância</option>
                                        </Field>
                                        <ErrorMessage
                                            component="span"
                                            name="turno"
                                            className="form-error"
                                        />
                                    </div>     
                            </div>
                            <div className="wrap-input">
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

                            <div className="wrap-botoes">
                                <div className="button-container">
                                    <button type="button" onClick={handleDeletarDados} className="deletar-button">Deletar Conta</button>
                                </div>
                                <div className="button-container">
                                    <button type="submit" className="submit-button">Atualizar Dados</button>
                                </div>
                                
                            </div>

                        </div>
                    </Form>
                </div>
            </Formik>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}