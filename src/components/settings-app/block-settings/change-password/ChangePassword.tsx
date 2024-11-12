import { TOKEN } from '@/app.constants';
import { authService } from '@/services/auth.service';
import { IDataNewpass, IDataResponse } from '@/types/data.types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react';
import styles from './ChangePassword.module.scss';

const ChangePassword: FC = () => {
  const [newPass, setNewPass] = useState<string>('')
  const [oldPass, setOldPass] = useState<string>('')
  const [confirmOldPass, setConfirmOldPass] = useState<string>('')
  const {query} = useRouter();
  const [dataResponse, setDataResponse] = useState<IDataResponse>({message: '', status: ''})

  const isDisabled = newPass === '' || oldPass === '' || newPass !== oldPass || confirmOldPass === '';

  const handleChange = (value: string, setValue:Dispatch<SetStateAction<string>>) => {
    setValue(value);
  };

  const token = Cookies.get(TOKEN);
  const dataNewpass: IDataNewpass = useMemo(() => ({
    password:newPass,
    oldpassword:confirmOldPass,
    map: query.map && typeof query.map === 'string' ? query.map : ''
  }), [newPass, oldPass, token]);

  const onClick = async () => {
    const response = await authService.newpass(dataNewpass)
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
    <div className={styles.block__changePassword}>
      {
        showError && 
          <div className={`${styles.block__title} ${styles.error}`}>
            <div
              className={styles.title}
              dangerouslySetInnerHTML={{ __html: dataResponse.message }}
            />
          </div>
      }

      <div className={`${styles.block__input} ${confirmOldPass !== '' && styles.has_content}`}>
        <label htmlFor='confirmOldPass' className={styles.input__label}>
        Старый пароль:</label>
        <input
          type="text"
          className={styles.input__login}
          id='confirmOldPass'
          value={confirmOldPass}
          onChange={(e) => handleChange(e.target.value, setConfirmOldPass)}
        />
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
      <button className={styles.button__restore} disabled={isDisabled} onClick={onClick}>сменить пароль</button>
    </div>
  )
}

export default ChangePassword