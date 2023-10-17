import { ClipLoader } from 'react-spinners'

export const BotaoCarregando = ({ className }) => {
  return (
    <button type="submit" className={className}>
      <ClipLoader color="#FFF" size={20}/>
      Enviando...
    </button>
  )
}