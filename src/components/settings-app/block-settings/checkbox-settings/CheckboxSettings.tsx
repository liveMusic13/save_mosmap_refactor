import { ICheckboxSettings } from '@/types/props.types'
import { FC } from 'react'
import styles from './CheckboxSettings.module.scss'

const CheckboxSettings: FC<ICheckboxSettings> = ({formStateCheck, checkbox, handleChangeCheckbox}) => {
  return (
    <div className={styles.block__checkbox}>
      <img src={formStateCheck[checkbox] ? "../images/icons/ok.svg" : "../images/icons/test.png"} alt="img" className={styles.image__checkbox}/>
      <input type="checkbox" className={styles.input__checkbox} checked={formStateCheck[checkbox] ?? false} onChange={() => handleChangeCheckbox(checkbox)}/>
      <span>{checkbox}</span>
    </div>
  )
}

export default CheckboxSettings