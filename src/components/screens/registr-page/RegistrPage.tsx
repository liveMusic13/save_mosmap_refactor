import { authService } from '@/services/auth.service'
import { IDataResponse, IRegistrationData } from '@/types/data.types'
import Link from 'next/link'
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react'
import styles from './RegistrPage.module.scss'

const RegistrPage: FC = () => {
  const [nameMap, setNameMap] = useState<string>('')
  const [login, setLogin] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [mapDescription, setMapDescription] = useState<string>('')

  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})

  const dataRegistr:IRegistrationData = useMemo(()=> ({
    login,
    password,
    email,
    mapname: nameMap,
    descr: mapDescription,
  }), [login, password, email, nameMap, mapDescription])

  const handleChange = (value: string, setValue:Dispatch<SetStateAction<string>>) => {
    setValue(value);
  };

  const isDisabled = login === '' || email === '' || password === ''

  const onClick = async () => {
    const response = await authService.registration(dataRegistr)
    setDataResponse(response)
  }

  return (
    <div className={styles.wrapper_registr}>
      {
        dataResponse.status === 'OK' ? (
          <div className={styles.block__title}>
            <div className={styles.title}>{dataResponse.message}</div>
          </div>
        ) : (
          <div className={styles.block__registration}>
          <h1 className={styles.title}>Регистрация</h1>
          <div className={`${styles.block__input} ${nameMap !== '' && styles.has_content}`}>
            <label htmlFor='nameMap' className={styles.input__label}>Название карты:</label>
            <input
              type="text"
              className={styles.input__login}
              id='nameMap'
              value={nameMap}
              onChange={(e) => handleChange(e.target.value, setNameMap)}
            />
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
          <div className={`${styles.block__input} ${password !== '' && styles.has_content}`}>
            <label htmlFor='password' className={styles.input__label}>
            Пароль:</label>
            <input
              type="text"
              className={styles.input__login}
              id='password'
              value={password}
              onChange={(e) => handleChange(e.target.value, setPassword)}
            />
          </div>
          <div className={`${styles.block__input} ${mapDescription !== '' && styles.has_content}`}>
            <label htmlFor='mapDescription' className={styles.input__label}>Описание карты:</label>
            <input
              type="text"
              className={styles.input__login}
              id='mapDescription'
              value={mapDescription}
              onChange={(e) => handleChange(e.target.value, setMapDescription)}
            />
          </div>
          <button className={styles.button__registr} disabled={isDisabled} onClick={onClick}>Зарегистрироваться</button>
          <p className={styles.description}>
            После регистрации на указанный вами адрес электронной почты придет письмо с подтверждением регистрации, вам необходимо будет перейти по ссылке внутри письма. <br/>
            Если вы уже зарегистрированы, вы можете <Link href={'/auth'}>войти в систему</Link>, используя свой логин и пароль. <br/>
            Если вы забыли пароль, воспользуйтесь <Link href={'/restore'}>напоминанием пароля</Link>.
          </p>
        </div>
        )
      }
    </div>
  )
}

export default RegistrPage