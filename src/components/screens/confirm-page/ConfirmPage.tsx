import { ACCESSIBLYMAP, TOKEN } from '@/app.constants'
import { authService } from '@/services/auth.service'
import { IDataResponse } from '@/types/data.types'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import styles from './ConfirmPage.module.scss'

const ConfirmPage: FC = () => {
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: '', map: ''})
  const router = useRouter()
  const [token, setToken] = useState('')
  
  const addResponse = async() => setDataResponse(await authService.confirm({token}))

  useEffect(()=> {
    if (token !== '') addResponse()
  }, [token])

  useEffect(() => {
    const queryValues = Object.keys(router.query);
    if (queryValues.length > 0) {
      const token = queryValues[0];
      if (dataResponse.token) Cookies.set(TOKEN, dataResponse.token);
      setToken(token)
    } else {
    }
  }, [router.query]);

  useEffect(()=> {
    console.log('Проверка содержимого ответа', dataResponse)
    if (dataResponse.status === 'OK') {
      Cookies.set(ACCESSIBLYMAP, String(dataResponse.map))

      router.push({
        pathname: `/`,
        query: { map: dataResponse.map },
      });
    } else if (dataResponse.status === 'error') {
      router.push('/auth')
    }
  }, [dataResponse])

  return (
    <div className={styles.wrapper_confirm}>
      <div className={styles.block__title}>
        {/* <div className={styles.title}>{dataResponse.message}</div> */}
        {/* <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: dataResponse.message }}
        /> */}
        {
          dataResponse.status !== 'OK' ? <></> : <div
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: dataResponse.message }}
        /> 
        }
      </div>
    </div>
  )
}

export default ConfirmPage