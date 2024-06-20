// import { TOKEN } from "@/app.constants";
// import { useAuth } from "@/hooks/useAuth";
// import Cookies from 'js-cookie';
// import { useRouter } from "next/router";
// import { useState } from "react";

// export default function Auth() {
//   const {isAuth} = useAuth()
//   const router = useRouter()
//   const [loginValue, setLoginValue] = useState('');
//   const [passwordValue, setPasswordValue] = useState('');

//   const auth = () => {
//     Cookies.set(TOKEN, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ik1nPT0iLCJhY2Nlc3MiOiJNUT09IiwicmVtb3RlIjoiZWZiNTQ0Y2MyYTRiNTRlNzUwNjY0ZGIxNGU1NTMxMjAiLCJleHAiOjE3MTI4NjkyNzl9.jUSSSrRFaQtk0PLbJhYVCqVhJkCnrLmnHY1yMUeDG61vrei83JEdedk03BbM7yzEcsobYkvXXR-Hec9yoRNtekxb3dV62PNntnOYfaso9E_vy1PerfaXFvNGB5QJMJrSJaE_vbjYlHAMHUH6pnfaBK8m7KCaDCShldQsScJVnvq2oR34hyuuGRm0fESTtEvWzgEB7sWroOKfcJNiU0Np8fZXxq3DH0nAJ-XEcku66hX7s9CzZxj4jraAgaXfMB3R_JiJm3q05gWqbXaZ1Ca5BXlmUi9pBz8F9PQcZbiaq5isVKXVCSrnGqmvk4xEOo-u4tuFtAFAwyNR4h-xY5rBtQ')
//     console.log(isAuth) 
//     router.push('/') 
//   }

//   return <div className="wrapper_auth">
//     <div className="block__auth">
//       <h1 className="title__auth">Авторизация</h1>
//       <div className="form">
//       <div className={`block__input ${loginValue && 'has-content'}`}>
//           <label className="input__label_login">
//             Логин:
//           </label>
//           <input id="input__login" className="input__login" type="text" value={loginValue} onChange={(e) => setLoginValue(e.target.value)}/>
//         </div>
//         <div className={`block__input ${passwordValue && 'has-content'}`}>
//           <label className="input__label_password" htmlFor="input__password">
//             Пароль:
//           </label>
//           <input id="input__password" className="input__password" type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>
//         </div>
//         <button className="button__auth" disabled={loginValue === '' || passwordValue === ''} onClick={auth}>ВОЙТИ</button>
//       </div>
//       <div className="block__all">
//         <button className="button__register">Зарегистрироваться</button>
//         <button className="button__restore-password">Восстановить пароль</button>
//       </div>
//     </div>
//   </div>
// }


import { useAuthPage } from "@/hooks/useAuthPage";
import { useState } from "react";

export default function Auth() {
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const auth = useAuthPage()

  return <div className="wrapper_auth">
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
        <button className="button__register">Зарегистрироваться</button>
        <button className="button__restore-password">Восстановить пароль</button>
      </div>
    </div>
  </div>
}