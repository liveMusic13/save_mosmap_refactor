import { TOKEN } from '@/app.constants';
import { IIsAuth } from '@/types/provider.types';
import Cookies from 'js-cookie';
import { createContext, FC, PropsWithChildren, useEffect, useState } from 'react';

export const AuthContext = createContext<IIsAuth>({} as IIsAuth)

const AuthProvider: FC<PropsWithChildren<unknown>> = ({children}) => {
  const [isAuth, setIsAuth] = useState(!!Cookies.get(TOKEN));
  const [isLoaded, setIsLoaded] = useState<boolean>(false) //HELP: ЧТОБЫ УБРАТЬ ОШИБКУ ГИДРАТАЦИИ
 
  useEffect(()=> {
    if (Cookies.get(TOKEN)) setIsAuth(true)
  }, [Cookies.get(TOKEN)])

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <div>Loading...</div>; // или любой другой компонент загрузки
  }

  return <AuthContext.Provider value={{isAuth, setIsAuth}}>{children}</AuthContext.Provider>
}

export default AuthProvider