import { settingsService } from '@/services/settings.service';
import { RootState } from '@/store/store';
import { IBlockSettings } from '@/types/props.types';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './BlockSettings.module.scss';
import CheckboxSettings from './checkbox-settings/CheckboxSettings';
import InputSettings from './input-settings/InputSettings';
import { arrayCheckboxName, arrayInputsName } from './inputs.data';

const BlockSettings: FC<IBlockSettings> = ({title}) => {
  const {query} = useRouter()
  const [formState, setFormState] = useState<any>({});
  const [formStateCheck, setFormStateCheck] = useState<any>({});
  const {points} = useSelector((state:RootState) => state.dataObjectsInMap)

  useEffect(()=> {
    if (typeof query.map === 'string') settingsService.getSettings(query.map, '')
  }, [])

  useEffect(()=> {
    console.log(formState)
  }, [formState])

  useEffect(()=> {
    const keys = Object.keys(points.icon_sizes);
    const lastKey = keys[keys.length - 1];
    const sizeMarker = points.icon_sizes[lastKey][0];

    setFormState((prevState:any) => ({...prevState, ['Название карты']: points.title }));
    setFormState((prevState:any) => ({...prevState, ['Описание карты']: points.description }));
    setFormState((prevState:any) => ({...prevState, ['Размер значков']: sizeMarker }));
    setFormState((prevState:any) => ({...prevState, ['Радиус зоны в метрах для анализа местности:']: 500 }));

    setFormStateCheck((prevState:any) => ({...prevState, ['Кластеризация']: points.clastering === 0 ? false : true }));
  }, [])

  const handleChange = (selectedOption:any, name:string) => {
    setFormState((prevState:any) => ({...prevState, [name]: selectedOption}));
    // if (type === 'input') {
    //   debouncedDispatch(name, selectedOption);
    // } else {
    //   debouncedDispatch(name, selectedOption.label, selectedOption.value);
    // }
  };

  const handleChangeCheckbox = (name:string) => {
    setFormStateCheck((prevState:any) => ({...prevState, [name]: !prevState[name]}));
  }

  return (
    <div className={styles.block__settings}>
      <div className={styles.block__title}>
        <h2 className={styles.title}>{title}</h2>
      </div>
      <form className={styles.form}>
        {
          arrayInputsName.map(field => <InputSettings key={field} formState={formState} field={field} handleChange={handleChange} />)
        }
        {
          arrayCheckboxName.map(checkbox => <CheckboxSettings key={checkbox} formStateCheck={formStateCheck} checkbox={checkbox} handleChangeCheckbox={handleChangeCheckbox} />)
        }
        <InputSettings formState={formState} field={'Радиус зоны в метрах для анализа местности:'} handleChange={handleChange} />
        <CheckboxSettings formStateCheck={formStateCheck} checkbox={'Радиус зоны в метрах для анализа местности:'} handleChangeCheckbox={handleChangeCheckbox} />
        <button className={styles.button__saveForm}>Сохранить</button>
      </form>
    </div>
  )
}

export default BlockSettings