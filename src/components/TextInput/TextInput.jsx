import { Field, ErrorMessage } from 'formik'

import styles from './style.module.css'

export const TextInput = ({ titulo, placeholder, nome, tipo = "text", max="50", children }) => {
  return (
    <div className={styles["input-group"]}>
      <label htmlFor={nome}>
        <p>{titulo}</p>
        <div className={styles["input-container"]}>
          {children || ''}
          <Field 
            className={styles["input"]}
            name={nome} 
            id={nome}
            type={tipo}
            placeholder={placeholder}
            maxLength={max}
          />
          <ErrorMessage
            component="span"
            name={nome}
            className={styles["form-error"]}
          />
        </div>
      </label>
    </div>
  )
}