import { authService } from '@/services/auth.service'
import { IDataResponse } from '@/types/data.types'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import styles from './ConfirmPage.module.scss'

const ConfirmPage: FC = () => {
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})
  const router = useRouter()
  const [token, setToken] = useState('')
  
  const addResponse = async() => setDataResponse(await authService.confirm({token}))

  useEffect(()=> {
    if (token !== '') addResponse()
    // authService.confirm({token})
  }, [token])

  useEffect(() => {
    const queryValues = Object.keys(router.query);
    if (queryValues.length > 0) {
      const token = queryValues[0]; // Забираем значение токена
      console.log('Token from URL:', token);
      setToken(token)
    } else {
      console.log('No Token found');
    }
  }, [router.query]);

  useEffect(()=> {
    console.log('Проверка содержимого ответа', dataResponse)
    if (dataResponse.status === 'OK') {
      router.push('/')
      console.log('OK', dataResponse)
    } else {
      // router.push('/auth')
      console.log('dataResponse.status', dataResponse.status)
    }
  }, [dataResponse])

  return (
    <div className={styles.wrapper_confirm}>
      <div className={styles.block__title}>
        <div className={styles.title}>{dataResponse.message}</div>
      </div>
    </div>
  )
}

export default ConfirmPage