import { CheckCircle, WarningCircle, Warning } from 'phosphor-react'

import '../../global.css'
import styles from './style.module.css'

export const Alert = ({ tipo, texto }) => {

  let propsComponent = {}

  if (tipo === "sucesso") {
    propsComponent = {
      bgColor: '#2E7D32',
      barColor: '#8EEB93',
      icone: <CheckCircle size={32} color={"#ffffff"} />
    }
  }
  else if (tipo === "erro") {
    propsComponent = {
      bgColor: '#D32F2F',
      barColor: '#FD9999',
      icone: <WarningCircle size={32} color={"#ffffff"} />
    }
  }
  else if (tipo === "aviso") {
    propsComponent = {
      bgColor: '#ED6C02',
      barColor: '#FFA459',
      icone: <Warning size={32} color={"#ffffff"} />
    }
  }

  return (
    <div className={styles["alert-container"]} style={{backgroundColor: propsComponent.bgColor}}>
      <div className={styles["alert-mensagem"]}>
        {propsComponent.icone}
        <p>{texto}</p>
      </div>
      <div className={styles["barra-carregamento"]} style={{backgroundColor: propsComponent.barColor}}>
      </div>
    </div>
  )
}