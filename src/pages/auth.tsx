import { useAuthPage } from "@/hooks/useAuthPage";
import Link from "next/link";
import { useState } from "react";

export default function Auth() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const auth = useAuthPage()

  return (
    <div className="wrapper_auth">
      <div className="block__auth">
        <h1 className="title__auth">Авторизация</h1>
        <div className="form">
        <div className={`block__input ${loginValue && 'has-content'}`}>
            <label className="input__label_login">
              Логин:
            </label>
            <input id="input__login" className="input__login" type="text" value={loginValue} onChange={(e) => setLoginValue(e.target.value)}/>
          </div>
          <div className={`block__input ${passwordValue && 'has-content'}`}>
            <label className="input__label_password" htmlFor="input__password">
              Пароль:
            </label>
            <input id="input__password" className="input__password" type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>
          </div>
          <button className="button__auth" disabled={loginValue === '' || passwordValue === ''} onClick={()=> auth({login:loginValue, password:passwordValue})}>ВОЙТИ</button>
        </div>
        <div className="block__all">
          {/* <button className="button__register">Зарегистрироваться</button>
          <button className="button__restore-password">Восстановить пароль</button> */}
          <Link href='/registr' className="button__register">Зарегистрироваться</Link>
          <Link href='/restore' className="button__restore-password">Восстановить пароль</Link>
        </div>
      </div>
    </div>
  )
}