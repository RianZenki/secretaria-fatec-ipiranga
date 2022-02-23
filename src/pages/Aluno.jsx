import { useLocation } from 'react-router-dom'


export const Aluno = () => {

    const { state } = useLocation()
    const { email } = state

    return (
        <div>
            <h1>Aluno</h1>
            <p>Email: {email}</p>
        </div>
    )
}