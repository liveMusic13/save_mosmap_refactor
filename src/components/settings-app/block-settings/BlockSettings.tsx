import { useDebounce } from '@/hooks/useDebounce';
import { useSaveSettingsMap } from '@/hooks/useSaveSettingsMap';
import { settingsService } from '@/services/settings.service';
import { actions as dataMapSettingsAction } from '@/store/data-map-settings/dataMapSettings.slice';
import { RootState } from '@/store/store';
import { IBlockSettings } from '@/types/props.types';
import { useRouter } from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './BlockSettings.module.scss';
import CheckboxSettings from './checkbox-settings/CheckboxSettings';
import InputSettings from './input-settings/InputSettings';
import { arrayCheckboxName, arrayInputsName } from './inputs.data';
import SelectTailes from './select-tiles/SelectTailes';

const BlockSettings: FC<IBlockSettings> = ({title}) => {
  const dispatch = useDispatch()
  const { debounce } = useDebounce()
  const saveData = useSaveSettingsMap()
  const {query} = useRouter()
  const [formState, setFormState] = useState<any>({});
  const [formStateCheck, setFormStateCheck] = useState<any>({});
  const {data} = useSelector((state:RootState) => state.dataMapSettings)

  useEffect(()=> {
    if (typeof query.map === 'string') settingsService.getSettings(dispatch)
  }, [])

  // useEffect(()=> {
  //   console.log(formState)
  //   console.log(formStateCheck)
  // }, [formState,formStateCheck])

  useEffect(()=> {
      setFormState((prevState:any) => ({...prevState, ['Название карты']: data.title }));
      setFormState((prevState:any) => ({...prevState, ['Описание карты']: data.descr }));
      setFormState((prevState:any) => ({...prevState, ['Размер значков']: data.iconsize }));
      setFormState((prevState:any) => ({...prevState, ['Радиус зоны в метрах для анализа местности:']: data.radius })); 
      setFormState((prevState:any) => ({...prevState, ['tiles_id']: data.tiles_id })); 

      setFormStateCheck((prevState:any) => ({...prevState, ['Кластеризация']: data.clastering === '0' ? false : true }));
      setFormStateCheck((prevState:any) => ({...prevState, ['Автоматическое масштабирование значков']: data.autosize === '0' ? false : true }));
      setFormStateCheck((prevState:any) => ({...prevState, ['Заменять значки на контуры домов']: data.showhouses === '0' ? false : true }));
      setFormStateCheck((prevState:any) => ({...prevState, ['Добавлять в карточку объекта анализ местности']: data.showanalytic === '0' ? false : true }));
}, [data])

  const debouncedDispatch = useCallback(debounce((action:any) => {
    dispatch(action);
  }, 500), [dispatch]);

  const handleChange = (selectedOption:any, name:string) => {
    setFormState((prevState:any) => ({...prevState, [name]: selectedOption}));

    const key = name === 'Название карты' ? 'title' : name === 'Описание карты' ? 'descr' : name === 'Размер значков' ? 'iconsize' : 'radius';

    const action = dataMapSettingsAction.editDataMapSettings({[key]: selectedOption})
    debouncedDispatch(action);
  };

  const handleChangeCheckbox = (name:string) => {
    setFormStateCheck((prevState:any) => ({...prevState, [name]: !prevState[name]}));
  }

  useEffect(() => {
    const add: any = {};
  
    for (const checkbox in formStateCheck) {
      if (formStateCheck.hasOwnProperty(checkbox)) {
        switch (checkbox) {
          case 'Автоматическое масштабирование значков':
            add.autosize = formStateCheck[checkbox] ? '1' : '0';
            break;
          case 'Кластеризация':
            add.clastering = formStateCheck[checkbox] ? '1' : '0';
            break;
          case 'Заменять значки на контуры домов':
            add.showhouses = formStateCheck[checkbox] ? '1' : '0';
            break;
          case 'Добавлять в карточку объекта анализ местности':
            add.showanalytic = formStateCheck[checkbox] ? '1' : '0';
            break;
          default:
            break;
        }
      }
    }
  
    const action = dataMapSettingsAction.editDataMapSettings(add);
    debouncedDispatch(action);
  }, [formStateCheck]);
  
  return (
    <div className={styles.block__settings}>
      <div className={styles.block__title}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <div className={styles.form}>
        {
          arrayInputsName.map(field => <InputSettings key={field} formState={formState} field={field} handleChange={handleChange} />)
        }
        {
          arrayCheckboxName.map(checkbox => <CheckboxSettings key={checkbox} formStateCheck={formStateCheck} checkbox={checkbox} handleChangeCheckbox={handleChangeCheckbox} />)
        }
        <InputSettings formState={formState} field={'Радиус зоны в метрах для анализа местности:'} handleChange={handleChange} />
        {/* <CheckboxSettings formStateCheck={formStateCheck} checkbox={'Показывать пешеходный траффик'} handleChangeCheckbox={handleChangeCheckbox} /> */}
        <SelectTailes formState={formState} setFormState={setFormState}/>
        <button type='button' className={styles.button__saveForm} onClick={saveData}>Сохранить</button>
      </div>
    </div>
  )
}

export default BlockSettings