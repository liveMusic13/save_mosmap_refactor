import { authService } from '@/services/auth.service'
import { IDataNewpass, IDataResponse } from '@/types/data.types'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import styles from './NewpassPage.module.scss'

const NewpassPage: FC = () => {
  const [newPass, setNewPass] = useState<string>('')
  const [oldPass, setOldPass] = useState<string>('')
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})

  const router = useRouter();

  useEffect(() => {
    // Получаем токен из query параметров
    const token = router.query.token as string;
    if (token) {
      console.log('Token from URL:', token);
    } else {
      console.log('No Token:', router.query, router.query.token, router.query.token as string);
    }
  }, [router.query]);

  const handleChange = (value: string, setValue:Dispatch<SetStateAction<string>>) => {
    setValue(value);
  };

  const dataNewpass: IDataNewpass = useMemo(() => ({
    password:newPass,
    oldpassword:oldPass
  }), [newPass, oldPass]);
  
  const isDisabled = newPass === '' || oldPass === '' || newPass !== oldPass;

  const onClick = async () => {
    const response = await authService.newpass(dataNewpass)
    setDataResponse(response)
  }

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
                type="text"
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
                type="text"
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