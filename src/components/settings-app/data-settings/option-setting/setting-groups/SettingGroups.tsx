import useWindowDimensions from '@/hooks/useWindowDimensions';
import { settingsService } from '@/services/settings.service';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import OptionBlock from './option-block/OptionBlock';
import styles from './SettingGroups.module.scss';

const SettingGroups: FC = () => {
  const {width} = useWindowDimensions()
  const {query} = useRouter()
  const dispatch = useDispatch();
  const {dataIdGroups} = useSelector((state: RootState) => state.dataMapSettings)
  const [listItems, setListItems] = useState<any>([])
  const optionsRef = useRef<any>(null);
  const [viewColor, setViewColor] = useState({id: null, isView: false}) //HELP: ЧТОБЫ ЕСЛИ ОДИН ИЗ ЦВЕТОВ ОТКРЫТ И ТЫ НАЖАЛ НА ДРУГОЙ, ТО ПРЕДЫДУЩИЙ ЗАКРЫЛСЯ И ТАК ЖЕ ДЛЯ ИКОНОК
  const [viewIcon, setViewIcon] = useState({id: null, isView: false})


  useEffect(()=> {
    const addData = async () => {
      const data = typeof query.map === 'string' ? await settingsService.listItems(query.map, dispatch, dataIdGroups) : []
      console.log(data)
      setListItems(data)
    }
    addData()
  }, [])

  // useEffect(() => {
  //   if (optionsRef.current !== null) optionsRef.current.scrollTo(1000, 1000)
  //     console.log(listItems)
  // }, [listItems]);

  const onClick = (button:string) => () => {
    if (button === 'отменить') {
      dispatch(viewSettingsAction.defaultIsPopupSettingGroups(''))
    } else if (button === 'ДОБАВИТЬ') {
      setListItems((prev:any) => [...prev, {id:'', name: ''}])
    } else {
      if (typeof query.map === 'string') settingsService.listItems(query.map, dispatch, dataIdGroups, listItems)
      dispatch(viewSettingsAction.defaultIsPopupSettingGroups(''))
    }
  }

  const handleChange = (value: string, id: number) => {
    setListItems((prev: any) => {
      // Создайте копию предыдущего состояния
      const updatedListItems = [...prev];
  
      // Найдите элемент по id
      const itemToUpdate = updatedListItems.find((item: any) => item.id === id);
  
      if (itemToUpdate) {
        // Обновите поле name
        itemToUpdate.name = value;
      }
  
      // Верните обновленное состояние
      return updatedListItems;
    });
  }

  const deleteOption = (id: number) => {
    setListItems((prev: any) => {
      // Фильтруем элементы, оставляя только те, у которых id не совпадает с заданным
      return prev.filter((item: any) => Number(item.id) !== Number(id));
    });
  }

  const objStyleName = {
    zero: (width && width <= 767.98) ? 'calc(186/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(680/1440*100vw)' : 'calc(599/1440*100vw)',
    one: (width && width <= 767.98) ? 'calc(186/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(486/1440*100vw)' : 'calc(279/1440*100vw)',
    two: (width && width <= 767.98) ? 'calc(186/1440*100vw)' : (width && width > 767.98 && width <= 991.98) ? 'calc(386/1440*100vw)' : 'calc(186/1440*100vw)', 
  }

  const centerTitleStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const renderColumn = (listItems:any) => {
    if (listItems && listItems.length > 0) {
      if (listItems[0].color !== undefined && listItems[0].icon_name !== undefined) {
        return (
          <>
            <h2 style={{width: 'calc(23.5/1440*100vw)'}} >#</h2>
            <h2 style={{width: objStyleName.two}}>Название</h2>
            <h2 style={{width: 'calc(186/1440*100vw)', ...centerTitleStyle}}>Иконка</h2>
            <h2 style={{width: 'calc(186/1440*100vw)', ...centerTitleStyle}}>Цвет</h2>
            <h2 style={{width: 'calc(194/1440*100vw)'}}>Действие</h2>
          </>
        )
    
      } else if (listItems[0].icon_name !== undefined) {
        return (
          <>
            <h2 style={{width: 'calc(23.5/1440*100vw)'}} >#</h2>
            <h2 style={{width: objStyleName.one}}>Название</h2>
            <h2 style={{width: 'calc(279/1440*100vw)', ...centerTitleStyle}}>Иконка</h2>
            <h2 style={{width: 'calc(194/1440*100vw)'}}>Действие</h2>
          </>
        )
    
      } else if (listItems[0].color !== undefined) {
        return (
          <>
            <h2 style={{width: 'calc(23.5/1440*100vw)'}} >#</h2>
            <h2 style={{width: objStyleName.one}}>Название</h2>
            <h2 style={{width: 'calc(279/1440*100vw)', ...centerTitleStyle }}>Цвет</h2>
            <h2 style={{width: 'calc(194/1440*100vw)'}}>Действие</h2>
          </>
        )
    
      } else {
        return (
          <>
            <h2 style={{width: 'calc(23.5/1440*100vw)'}} >#</h2>
            <h2 style={{width: objStyleName.zero}}>Название</h2>
            <h2 style={{width: 'calc(194/1440*100vw)'}}>Действие</h2>
          </>
        )
      }
    }

  }
  console.log(window.innerWidth, window.innerHeight)
  return (
    <div className={styles.wrapper_settingsGroup}>
      <h2 className={styles.title}>Настроить группу</h2>
      <div className={styles.block__content}>
        <div className={styles.block__columns}>
          {/* <h2 style={{width: 'calc(23.5/1440*100vw)'}} >#</h2>
          <h2 style={{width: 'calc(559/1440*100vw)'}}>Название</h2>
          <h2 style={{width: 'calc(194/1440*100vw)'}}>Действие</h2> */}
          {
            renderColumn(listItems)
          }
        </div>
        <div className={styles.block__options} ref={optionsRef}>
          {
            listItems.map((option:{id: number, name: string}, index:number)=> (
              <OptionBlock key={option.id} option={option} index={index} listItems={listItems} handleChange={handleChange} deleteOption={deleteOption} setListItems={setListItems} viewColor={viewColor} setViewColor={setViewColor} viewIcon={viewIcon} setViewIcon={setViewIcon} />
            ))
          }
        </div>
      </div>
      <button className={styles.button__add} onClick={onClick('ДОБАВИТЬ')}>ДОБАВИТЬ</button>
      <div className={styles.block__buttons}>
        <button className={styles.button} onClick={onClick('отменить')}>отменить</button>
        <button className={`${styles.button} ${styles.save}`} onClick={onClick('сохранить')}>сохранить</button>
      </div>
    </div>
  )
}

export default SettingGroups