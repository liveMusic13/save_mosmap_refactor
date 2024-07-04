import { actions as dataMapSettingsAction } from '@/store/data-map-settings/dataMapSettings.slice'
import { actions as popupEditAction } from '@/store/popup-edit/popupEdit.slice'
import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { IButtonOptionSettings } from '@/types/props.types'
import { FC, PropsWithChildren } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ButtonOptionSettings.module.scss'

const ButtonOptionSettings: FC<PropsWithChildren<IButtonOptionSettings>> = ({children, isMouseEnter, text, title, data}) => {
  const dispatch = useDispatch()

  const onClick = (button: string) => () => {
    if (button === 'Изменить') {
      dispatch(popupEditAction.addTitle(title))
      dispatch(popupEditAction.addData(data))
      dispatch(viewSettingsAction.activeIsViewPopupSettings(''))
    } else if (button === 'Удалить') {
      console.log(data)
      dispatch(popupEditAction.addId(data?.id))
      dispatch(viewSettingsAction.activeIsViewDeletePopup(''))
    } else {
      console.log(button, data)
      dispatch(dataMapSettingsAction.addDataIdGroups(data?.id))
      dispatch(viewSettingsAction.activeIsPopupSettingGroups(''))
    }
  }

  return <button className={isMouseEnter ? `${styles.button} ${styles.hover_option}` : `${styles.button}`} onClick={onClick(text)}>{children}</button>
}

export default ButtonOptionSettings