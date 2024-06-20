import { useDebounce } from '@/hooks/useDebounce'
import { settingsService } from '@/services/settings.service'
import { actions as popupEditAction } from '@/store/popup-edit/popupEdit.slice'
import { RootState } from '@/store/store'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { useRouter } from 'next/router'
import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './PopupEdit.module.scss'

const PopupEdit: FC = () => {
  const dispatch = useDispatch()
  const {debounce} = useDebounce()
  const {query} = useRouter()
  const { title, data } = useSelector((state:RootState)=> state.popupEdit)
  const titleFieldsCheckbox:string[] = ['Текст для списка', 'Текст для карты', 'Адрес' ]
  const titleObjectsCheckbox:string[] = ['Множ. выбор', 'Иконка', 'Цвет' ]
  const titleMapCheckbox:string[] = ['Множ. выбор', 'Вкл/Выкл' ]
  const mapCheckbox = title === 'Поля' ? titleFieldsCheckbox : title === 'Карта' ? titleMapCheckbox : titleObjectsCheckbox

  const [inputValue, setInputValue] = useState<string>(data.name)

  const [checkedState, setCheckedState] = useState(
    new Array(mapCheckbox.length).fill(false)
  );

  useEffect(()=> {
    if (data) {
      if (title === 'Поля') {
        setCheckedState([
          data?.namefield === 1,
          data?.nameonmap === 1,
          data?.address === 1
        ]);
      } else if (title === 'Карта') {
        setCheckedState([
          data?.mode === 1,
          data?.visible === 1
        ])
      } else {
        setCheckedState([
          data?.mode === 1,
          data?.icon === 1,
          data?.color === 1,
        ])
      }
    }
  }, [])

  // Обработчик изменения чекбокса
  const handleOnChange = (position: number) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    if (title === 'Поля') {
      const keyData = position === 0 ? 'namefield' : position === 1 ? 'nameonmap' : 'address'
      dispatch(popupEditAction.changeCheckbox(
        {
          key: keyData, value: checkedState[position] ? 0 : 1
        }
      ))
    } else if (title === 'Карта') {
      const keyData = position === 0 ? 'mode' : 'visible'
      dispatch(popupEditAction.changeCheckbox(
        {
          key: keyData, value: checkedState[position] ? 0 : 1
        }
      ))
    } else {
      const keyData = position === 0 ? 'mode' : position === 1 ? 'icon' : 'color'
      dispatch(popupEditAction.changeCheckbox(
        {
          key: keyData, value: checkedState[position] ? 0 : 1
        }
      ))
    }
  };

  const onClick = (button:string) => () => {
    if (button === 'отменить') {
      dispatch(viewSettingsAction.defaultIsViewPopupSettings(''))
    } else {
      if (title === 'Поля') {
        if (typeof query.map === 'string') settingsService.editFields(query.map, dispatch, data)
      } else if (title === 'Карта') {
        if (typeof query.map === 'string') settingsService.editMaps(query.map, dispatch, data)
      } else {
        if (typeof query.map === 'string') settingsService.editLists(query.map, dispatch, data)
      }
      dispatch(viewSettingsAction.defaultIsViewPopupSettings(''))
    }
  }

  const debouncedDispatch = useCallback(debounce((newValue:any) => {
    dispatch(popupEditAction.addName(newValue));

  }, 500), []);
  
  // Используйте useEffect для вызова debouncedDispatch каждый раз при изменении inputValue
  useEffect(() => {
  // Сохраняем идентификатор таймера
  const timerId = debouncedDispatch(inputValue);
  
    // Очистите таймер при размонтировании компонента
    return () => {
      clearTimeout(timerId);
    };
  }, [inputValue, debouncedDispatch]);

  return (
    <div className={styles.block__popupEdit}>
      <h2 className={styles.title}>Изменить поле</h2>
      <div className={styles.block__form}>
        <input type="text" className={styles.input} value={inputValue} onChange={e => setInputValue(e.target.value)} disabled={title === 'Карта'}/>
        {
          mapCheckbox.map((checkbox, index) => (
            <div key={checkbox + Math.random()} className={styles.block__checkbox}>
              <input type="checkbox"  className={styles.checkbox} id={`custom-checkbox-${index}`} value={checkbox} checked={checkedState[index]} onChange={() => handleOnChange(index)} />
              {
                checkedState[index] ? (
                  <img src="../images/icons/ok.svg" alt="img" className={styles.image__checkbox} />
                ) : (
                  <div className={styles.square}></div>
                )
              }
              <label htmlFor={`custom-checkbox-${index}`}>{checkbox}</label>
            </div>
          ))
        }
      </div>
      <div className={styles.block__buttons}>
        <button onClick={onClick('отменить')} className={styles.button}>отменить</button>
        <button onClick={onClick('сохранить')} className={`${styles.button} ${styles.save}`} >сохранить</button>
      </div>
    </div>
  )
}

export default PopupEdit