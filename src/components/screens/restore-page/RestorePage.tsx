import { authService } from '@/services/auth.service'
import { IDataResponse, IRestoreData } from '@/types/data.types'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import styles from './RestorePage.module.scss'

const RestorePage: FC = () => {
  const [login, setLogin] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})

  const handleChange = (value: string, setValue:Dispatch<SetStateAction<string>>) => {
    setValue(value);
  };

  const dataRestore: IRestoreData = useMemo(() => {
    const result: Partial<IRestoreData> = {};
    if (login) {
      result.login = login;
    }
    if (email) {
      result.email = email;
    }
    return result;
  }, [login, email]);
  

  const isDisabled = login === '' && email === '';

  const onClick = async () => {
    const response = await authService.restore(dataRestore)
    setDataResponse(response)
  }

  const [showError, setShowError] = useState(false); 
  useEffect(() => { 
    if (dataResponse.status === 'error') { 
      setShowError(true); 
      const timer = setTimeout(() => { 
        setShowError(false); 
      }, 5000); 
      return () => clearTimeout(timer); 
    } 
  }, [dataResponse.status])

  return (
    <div className={styles.wrapper_restore}>

      {
        showError && 
          <div className={`${styles.block__title} ${styles.error}`}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: dataResponse.message }}
            />
          </div>
      }

      {
        dataResponse.status === 'OK' ? (
          <div className={styles.block__title_rest}>
            <div className={styles.title}>{dataResponse.message}</div>
          </div>
        ) : (
          <div className={styles.block__restore}>
            <div className={styles.block__title}>
              <h1>Восстановление пароля</h1>
              <p>Укажите логин или адрес электронной почты, с которого вы регистрировались. На этот адрес придет письмо со ссылкой на сброс пароля.</p>
            </div>
            <div className={`${styles.block__input} ${login !== '' && styles.has_content}`}>
              <label htmlFor='login' className={styles.input__label}>Логин:</label>
              <input
                type="text"
                className={styles.input__login}
                id='login'
                value={login}
                onChange={(e) => handleChange(e.target.value, setLogin)}
              />
            </div>
            <div className={`${styles.block__input} ${email !== '' && styles.has_content}`}>
              <label htmlFor='email' className={styles.input__label}>
              Почта:</label>
              <input
                type="text"
                className={styles.input__login}
                id='email'
                value={email}
                onChange={(e) => handleChange(e.target.value, setEmail)}
              />
            </div>
            <button className={styles.button__restore} disabled={isDisabled} onClick={onClick} >восстановить</button>
            <div className={styles.block__all}>
              <Link href='/auth' className={styles.button__register}>Войти</Link>
              <Link href='/registr' className={styles["button__restore-password"]}>Зарегистрироваться</Link>
            </div>
          </div>
        ) 
      }
      
    </div>
  )
}

export default RestorePage