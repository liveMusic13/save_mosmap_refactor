import { useAddObject } from '@/hooks/useAddObject';
import { useSaveObject } from '@/hooks/useSaveObject';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { RootState } from '@/store/store';
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice';
import { IButtonEditing } from '@/types/props.types';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ButtonEditing.module.scss';

const ButtonEditing: FC<IButtonEditing> = ({icon}) => {
  const [clickButton, setClickButton] = useState<boolean>(false);
  const [clickEditButton, setClickEditButton] = useState<boolean>(false);
  const {editingObjects, isSettingsMap} = useSelector((state:RootState)=> state.viewSettings)
  const dataObjectInfo = useSelector((state:RootState)=> state.dataObjectInfo)
  const dispatch = useDispatch()
  const { width } = useWindowDimensions();
  const {getField} = useAddObject()
  const {saveObject} = useSaveObject()

  const checkDisabled = icon.id === 9 && editingObjects.isAddObject ? false : icon.id === 10 && editingObjects.isEditObjects ? false : icon.id === 11 && editingObjects.isDeleteObject ? false : icon.id === 12 && editingObjects.isDeleteMarker ? false : true

  useEffect(()=> {
    if (editingObjects.isActiveAddButton) { 
      dispatch(viewSettingsAction.defaultDeleteMarker(''))
      dispatch(viewSettingsAction.defaultDeleteObject(''))
      dispatch(viewSettingsAction.defaultEditObjects(''))
    } else if (dataObjectInfo.id && !editingObjects.isActiveAddButton) {
      dispatch(viewSettingsAction.activeDeleteMarker(''))
      dispatch(viewSettingsAction.activeDeleteObject(''))
      dispatch(viewSettingsAction.activeEditObjects(''))
    } else {
      dispatch(viewSettingsAction.defaultDeleteMarker(''))
      dispatch(viewSettingsAction.defaultDeleteObject(''))
      dispatch(viewSettingsAction.defaultEditObjects(''))
    }
  }, [dataObjectInfo, clickButton])

  useEffect(()=> {
    if (width && width <= 767.98) {
      if (!editingObjects.isActiveEditButton) {
        setClickEditButton(false)
      } 
      } else {
        if (!editingObjects.isActiveAddButton) {
          setClickButton(false)
        } 
        if (!editingObjects.isActiveEditButton) {
          setClickEditButton(false)
        } else {
          setClickEditButton(true)
        }
    }
  },[editingObjects.isActiveAddButton, editingObjects.isActiveEditButton])

  return (
          <button className={styles.buttonEditing} disabled={checkDisabled} onClick={()=> {
            if (width && width >= 767.98 && icon.id === 9 || icon.id === 10 ) setClickButton(!clickButton);
            if (width && width <= 767.98 && icon.id === 9 || icon.id === 10 ) setClickButton(!clickButton);

            if (width && width >= 767.98 && icon.id === 9) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              if (!editingObjects.isActiveAddButton) { //HELP:СТАВЛЮ ОТРИЦАНИЕ, ПОТОМУ ЧТО НА МОМЕНТ ВЫПОЛНЕНИЯ УСЛОВИЯ, СОСТОЯНИЕ КНОПКИ НЕ УСПЕВАЕТ В РЕДАКСЕ ИЗМЕНИТСЯ И ПОЛУЧАЕТСЯ ЧТО РАБОТАЕТ НАОБОРОТ. ПОЭТОМУ СТАВЛЮ ТАК
                getField()
              } else {
                saveObject()
              }
            }
            if (width && width <= 767.98 && icon.id === 9) {
              dispatch(viewSettingsAction.toggleIsActiveAddButton(''))
              if (!editingObjects.isActiveAddButton) { //HELP:СТАВЛЮ ОТРИЦАНИЕ, ПОТОМУ ЧТО НА МОМЕНТ ВЫПОЛНЕНИЯ УСЛОВИЯ, СОСТОЯНИЕ КНОПКИ НЕ УСПЕВАЕТ В РЕДАКСЕ ИЗМЕНИТСЯ И ПОЛУЧАЕТСЯ ЧТО РАБОТАЕТ НАОБОРОТ. ПОЭТОМУ СТАВЛЮ ТАК
                dispatch(viewSettingsAction.activeSettingsMap(''))
                getField()
              } else {
                dispatch(viewSettingsAction.toggleSettingsMap(''))
                saveObject()
              }
            }
            if (width && width >= 767.98 && icon.id === 10) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
            
              if(editingObjects.isActiveEditButton) {
                saveObject()
              }
            }
            if (width && width <= 767.98 && icon.id === 10) {
              dispatch(viewSettingsAction.toggleIsActiveEditButton(''))
              dispatch(viewSettingsAction.activeSettingsMap(''))

              if(editingObjects.isActiveEditButton) {
                saveObject()
              }
            }
            if (icon.id === 11) {
              dispatch(viewSettingsAction.activeIsViewPopupObject(''))
            }
            if (icon.id === 12) {
              dispatch(viewSettingsAction.activeIsViewPopupMarker(''))
            }
          }}>
            <svg className={styles.icon_svg} style={icon.id === 10 ? (clickEditButton ? {color: 'red'}: {color: '#26a69a'}) : (clickButton ? {color: 'red'}: {color: '#26a69a'})}>
              <use
                xlinkHref={icon.src}
              ></use>
            </svg>
            <p
              className={styles.hover__text}
              style={
                icon.id === 6 || icon.id === 7 || icon.id === 8
                  ? {
                      right: 0,
                    }
                  : { left: 0 }
              }
            >
              {icon.hover_text}
            </p>
          </button>
  )
}

export default ButtonEditing