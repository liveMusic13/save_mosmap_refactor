import { ACCESSIBLYMAP, TOKEN } from '@/app.constants'
import { authService } from '@/services/auth.service'
import { IDataNewpass, IDataResponse } from '@/types/data.types'
import Cookies from 'js-cookie'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import styles from './NewpassPage.module.scss'

const NewpassPage: FC = () => {
  const [newPass, setNewPass] = useState<string>('')
  const [oldPass, setOldPass] = useState<string>('')
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})
  const [token, setToken] = useState('')
  const router = useRouter();

  useEffect(() => {
    const queryValues = Object.keys(router.query);
    if (queryValues.length > 0) {
      const token = queryValues[0]; // Забираем значение токена
      // console.log('Token from URL:', token);
      setToken(token)
    } else {
      console.log('No Token found');
    }
  }, [router.query]);

  const handleChange = (value: string, setValue:Dispatch<SetStateAction<string>>) => {
    setValue(value);
  };

  const dataNewpass: IDataNewpass = useMemo(() => ({
    password:newPass,
    // oldpassword:oldPass,
    token: token
  }), [newPass, oldPass, token]);
  
  const isDisabled = newPass === '' || oldPass === '' || newPass !== oldPass;

  const onClick = async () => {
    const response = await authService.newpass(dataNewpass)
    setDataResponse(response)
  }

  useEffect(()=> {
    console.log('Проверка содержимого ответа', dataResponse)
    if (dataResponse.status === 'OK') {
      Cookies.set(ACCESSIBLYMAP, String(dataResponse.map))

      if (dataResponse.token) {
        Cookies.set(TOKEN, dataResponse.token);
        console.log('dataResponse true', dataResponse)
      } else {
        console.log('dataResponse false', dataResponse)
      }

      router.push({
        pathname: `/`,
        query: { map: dataResponse.map },
      });
    } else if (dataResponse.status === 'error') {
      router.push('/auth')
    }
  }, [dataResponse])

  return (
    <div className={styles.wrapper_restore}>
      {/* {
        dataResponse.status === 'OK' ? (
          <div className={styles.block__title_rest}>
            <div className={styles.title}>{dataResponse.message}</div>
          </div>
        ) : ( */}
          <div className={styles.block__restore}>
            <div className={styles.block__title}>
              <h1>Восстановление пароля</h1>
              {/* <p>Укажите логин или адрес электронной почты, с которого вы регистрировались. На этот адрес придет письмо со ссылкой на сброс пароля.</p> */}
            </div>
            <div className={`${styles.block__input} ${newPass !== '' && styles.has_content}`}>
              <label htmlFor='login' className={styles.input__label}>Новый пароль:</label>
              <input
                type="password"
                className={styles.input__login}
                id='newPass'
                value={newPass}
                onChange={(e) => handleChange(e.target.value, setNewPass)}
              />
            </div>
            <div className={`${styles.block__input} ${oldPass !== '' && styles.has_content}`}>
              <label htmlFor='oldPass' className={styles.input__label}>
              Подтверждение пароля:</label>
              <input
                type="password"
                className={styles.input__login}
                id='oldPass'
                value={oldPass}
                onChange={(e) => handleChange(e.target.value, setOldPass)}
              />
            </div>
            <button className={styles.button__restore} disabled={isDisabled} onClick={onClick} >сменить пароль</button>
            <div className={styles.block__all}>
              <Link href='/auth' className={styles.button__register}>Войти</Link>
              <Link href='/registr' className={styles["button__restore-password"]}>Зарегистрироваться</Link>
            </div>
          </div>
        {/* ) 
      } */}
      
    </div>
  )
}

export default NewpassPage