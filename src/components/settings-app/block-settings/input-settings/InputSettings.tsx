import { IInputSettings } from '@/types/props.types'
import { FC } from 'react'
import styles from './InputSettings.module.scss'

const InputSettings: FC<IInputSettings> = ({formState, field, handleChange}) => {
  return (
    <div className={`${styles.block__input} ${formState[field] && styles.has_content}`} key={field}>
      <label htmlFor={field} className={styles.input__label}>{field}</label>
      <input type="text" className={styles.input__login} id={field} value={formState[field]} onChange={(e) => handleChange(e.target.value, field)}/>
    </div>
  )
}

export default InputSettings