import { actions as viewSettingsAction } from '@/store/view-settings/viewSettings.slice'
import { IButtonEditing } from '@/types/props.types'
import { FC } from 'react'
import { useDispatch } from 'react-redux'
import styles from './ButtonSettings.module.scss'

const ButtonSettings: FC<IButtonEditing> = ({icon}) => {
  const dispatch = useDispatch()

  const _onClick = () => {
    if (icon.id === 16) dispatch(viewSettingsAction.activeIsViewExport(''))
    if (icon.id === 15) dispatch(viewSettingsAction.activeIsViewImport(''))
    if (icon.id === 14) dispatch(viewSettingsAction.activeSettingsApp(''))
    if (icon.id === 13) dispatch(viewSettingsAction.activeSettingsData(''))
  }

  return (
    <button className={styles.button_settings} onClick={_onClick}>
      <svg className={styles.icon_svg}>
        <use
          xlinkHref={icon.src}
        ></use>
      </svg>
      <p
        className={styles.hover__text}
        style={{ left: 0 }}
      >
        {icon.hover_text}
      </p>
    </button>
  )
}

export default ButtonSettings